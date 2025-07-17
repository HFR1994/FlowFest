import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_DEFAULT } from 'react-native-maps';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MapLocation {
  id: string;
  name: string;
  type: 'stage' | 'food' | 'facility' | 'entrance';
  latitude: number;
  longitude: number;
  crowdLevel: 'low' | 'medium' | 'high';
  description: string;
  capacity?: number;
  currentAttendance?: number;
}

interface BusyArea {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  intensity: 'low' | 'medium' | 'high';
}

// Central Park coordinates for festival locations
const mapLocations: MapLocation[] = [
  // Stages
  {
    id: 'main-stage',
    name: 'Main Stage',
    type: 'stage',
    latitude: 40.7829,
    longitude: -73.9654,
    crowdLevel: 'high',
    description: 'Primary performance venue featuring headlining acts',
    capacity: 8000,
    currentAttendance: 6800,
  },
  {
    id: 'electronic-stage',
    name: 'Electronic Stage',
    type: 'stage',
    latitude: 40.7835,
    longitude: -73.9648,
    crowdLevel: 'high',
    description: 'Dedicated electronic music performances',
    capacity: 4000,
    currentAttendance: 3200,
  },
  {
    id: 'acoustic-stage',
    name: 'Acoustic Stage',
    type: 'stage',
    latitude: 40.7825,
    longitude: -73.9665,
    crowdLevel: 'medium',
    description: 'Intimate acoustic performances',
    capacity: 2000,
    currentAttendance: 1200,
  },
  {
    id: 'world-music-stage',
    name: 'World Music Stage',
    type: 'stage',
    latitude: 40.7820,
    longitude: -73.9650,
    crowdLevel: 'medium',
    description: 'International and world fusion acts',
    capacity: 3000,
    currentAttendance: 2200,
  },
  
  // Food Vendors
  {
    id: 'food-court-1',
    name: 'Central Food Court',
    type: 'food',
    latitude: 40.7827,
    longitude: -73.9652,
    crowdLevel: 'high',
    description: 'Main dining area with 15+ food vendors',
  },
  {
    id: 'food-truck-alley',
    name: 'Food Truck Alley',
    type: 'food',
    latitude: 40.7815,
    longitude: -73.9660,
    crowdLevel: 'medium',
    description: 'Gourmet food trucks and street food',
  },
  {
    id: 'craft-beer-garden',
    name: 'Craft Beer Garden',
    type: 'food',
    latitude: 40.7840,
    longitude: -73.9645,
    crowdLevel: 'medium',
    description: 'Local craft breweries and cocktails',
  },
  {
    id: 'vegan-corner',
    name: 'Vegan Corner',
    type: 'food',
    latitude: 40.7822,
    longitude: -73.9670,
    crowdLevel: 'low',
    description: 'Plant-based food options',
  },
  
  // Facilities
  {
    id: 'main-entrance',
    name: 'Main Entrance',
    type: 'entrance',
    latitude: 40.7845,
    longitude: -73.9655,
    crowdLevel: 'high',
    description: 'Primary festival entrance with security check',
  },
  {
    id: 'vip-entrance',
    name: 'VIP Entrance',
    type: 'entrance',
    latitude: 40.7842,
    longitude: -73.9648,
    crowdLevel: 'low',
    description: 'Exclusive entrance for VIP ticket holders',
  },
  {
    id: 'first-aid',
    name: 'First Aid Station',
    type: 'facility',
    latitude: 40.7818,
    longitude: -73.9658,
    crowdLevel: 'low',
    description: 'Medical assistance and emergency services',
  },
  {
    id: 'merchandise',
    name: 'Merchandise Tent',
    type: 'facility',
    latitude: 40.7823,
    longitude: -73.9648,
    crowdLevel: 'medium',
    description: 'Official festival merchandise and artist goods',
  },
  {
    id: 'restrooms-1',
    name: 'Restrooms',
    type: 'facility',
    latitude: 40.7830,
    longitude: -73.9668,
    crowdLevel: 'medium',
    description: 'Public restroom facilities',
  },
  {
    id: 'restrooms-2',
    name: 'Restrooms',
    type: 'facility',
    latitude: 40.7817,
    longitude: -73.9645,
    crowdLevel: 'medium',
    description: 'Public restroom facilities',
  },
];

const busyAreas: BusyArea[] = [
  { id: 'main-stage-crowd', latitude: 40.7829, longitude: -73.9654, radius: 80, intensity: 'high' },
  { id: 'electronic-stage-crowd', latitude: 40.7835, longitude: -73.9648, radius: 60, intensity: 'high' },
  { id: 'food-court-crowd', latitude: 40.7827, longitude: -73.9652, radius: 50, intensity: 'medium' },
  { id: 'entrance-crowd', latitude: 40.7845, longitude: -73.9655, radius: 40, intensity: 'high' },
  { id: 'world-music-crowd', latitude: 40.7820, longitude: -73.9650, radius: 45, intensity: 'medium' },
];

const OpenStreetMapComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Central Park center coordinates
  const initialRegion = {
    latitude: 40.7829,
    longitude: -73.9654,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const handleLocationPress = (location: MapLocation) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'stage': return '🎤';
      case 'food': return '🍕';
      case 'facility': return '🏢';
      case 'entrance': return '🚪';
      default: return '📍';
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'stage': return '#ff6b6b';
      case 'food': return '#4ecdc4';
      case 'facility': return '#45b7d1';
      case 'entrance': return '#96ceb4';
      default: return '#feca57';
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getBusyAreaColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'rgba(255, 71, 87, 0.4)'; // Red for high crowd
      case 'medium': return 'rgba(255, 165, 2, 0.3)'; // Orange for medium crowd
      case 'low': return 'rgba(255, 215, 0, 0.2)'; // Yellow for low crowd
      default: return 'rgba(255, 165, 2, 0.3)';
    }
  };

  const zoomToLocation = (location: MapLocation) => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    }, 1000);
  };

  const resetView = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Map Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ Festival Map</Text>
        <Text style={styles.headerSubtitle}>Central Park, New York - OpenStreetMap</Text>
      </View>

      {/* Map Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetButton} onPress={resetView}>
          <Text style={styles.resetButtonText}>Reset View</Text>
        </TouchableOpacity>
      </View>

      {/* OpenStreetMap */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          provider={PROVIDER_DEFAULT}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={false}
          mapType="standard"
        >
          {/* Busy Areas as Circles */}
          {busyAreas.map((area) => (
            <Circle
              key={area.id}
              center={{
                latitude: area.latitude,
                longitude: area.longitude,
              }}
              radius={area.radius}
              fillColor={getBusyAreaColor(area.intensity)}
              strokeColor="transparent"
              strokeWidth={0}
            />
          ))}

          {/* Location Markers */}
          {mapLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={location.description}
              onPress={() => handleLocationPress(location)}
            >
              <View style={[
                styles.customMarker,
                { backgroundColor: getLocationColor(location.type) }
              ]}>
                <Text style={styles.markerIcon}>
                  {getLocationIcon(location.type)}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
        
        {/* Fixed Legend */}
        <View style={styles.fixedLegend}>
          <Text style={styles.legendTitle}>Legend:</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#ff6b6b' }]} />
            <Text style={styles.legendText}>🎤 Stages</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4ecdc4' }]} />
            <Text style={styles.legendText}>🍕 Food</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#45b7d1' }]} />
            <Text style={styles.legendText}>🏢 Facilities</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#96ceb4' }]} />
            <Text style={styles.legendText}>🚪 Entrances</Text>
          </View>
        </View>
      </View>

      {/* Live Updates */}
      <View style={styles.liveUpdates}>
        <Text style={styles.liveUpdatesTitle}>🔴 Live Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>Main Stage: High crowd density</Text>
          </View>
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>Food Court: 15 min wait</Text>
          </View>
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>Restrooms: Available</Text>
          </View>
        </ScrollView>
      </View>

      {/* Location Detail Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLocation && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>
                    {getLocationIcon(selectedLocation.type)}
                  </Text>
                  <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalDescription}>
                  {selectedLocation.description}
                </Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Crowd Level</Text>
                    <View style={[
                      styles.crowdIndicator,
                      { backgroundColor: getCrowdColor(selectedLocation.crowdLevel) }
                    ]}>
                      <Text style={styles.crowdText}>
                        {selectedLocation.crowdLevel.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  {selectedLocation.capacity && (
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Capacity</Text>
                      <Text style={styles.statValue}>
                        {selectedLocation.currentAttendance}/{selectedLocation.capacity}
                      </Text>
                    </View>
                  )}
                </View>
                
                <TouchableOpacity
                  style={styles.directionsButton}
                  onPress={() => {
                    zoomToLocation(selectedLocation);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.directionsButtonText}>
                    🧭 Zoom to Location
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OpenStreetMapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  controls: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 10,
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  markerIcon: {
    fontSize: 18,
    color: '#fff',
  },
  fixedLegend: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
  },
  legendTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#fff',
    fontSize: 10,
  },
  liveUpdates: {
    backgroundColor: '#111',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  liveUpdatesTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateItem: {
    backgroundColor: '#222',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  updateText: {
    color: '#ccc',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  modalTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalDescription: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalStats: {
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statValue: {
    color: '#ccc',
    fontSize: 16,
  },
  crowdIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  crowdText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  directionsButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  directionsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
