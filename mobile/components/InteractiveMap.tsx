import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

// Web-only imports for React Leaflet
let MapContainer: any, TileLayer: any, Marker: any, Popup: any, Circle: any;
let L: any;
if (Platform.OS === 'web') {
  try {
    const leaflet = require('react-leaflet');
    MapContainer = leaflet.MapContainer;
    TileLayer = leaflet.TileLayer;
    Marker = leaflet.Marker;
    Popup = leaflet.Popup;
    Circle = leaflet.Circle;
    L = require('leaflet');
    
    // Fix for default markers in React Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  } catch (error) {
    console.warn('React Leaflet not available:', error);
  }
}

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

const InteractiveMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      case 'high': return 'rgba(255, 71, 87, 0.4)';
      case 'medium': return 'rgba(255, 165, 2, 0.3)';
      case 'low': return 'rgba(255, 215, 0, 0.2)';
      default: return 'rgba(255, 165, 2, 0.3)';
    }
  };

  // Generate HTML for OpenStreetMap with Leaflet (for mobile)
  const generateMapHTML = () => {
    const markersJS = mapLocations.map(location => `
      var customIcon${location.id.replace(/-/g, '_')} = L.divIcon({
        html: '<div style="background-color: ${getLocationColor(location.type)}; width: 35px; height: 35px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 3px 8px rgba(0,0,0,0.4); cursor: pointer;">${getLocationIcon(location.type)}</div>',
        className: 'custom-div-icon',
        iconSize: [35, 35],
        iconAnchor: [17.5, 17.5]
      });
      
      L.marker([${location.latitude}, ${location.longitude}], {icon: customIcon${location.id.replace(/-/g, '_')}})
        .addTo(map)
        .bindPopup(\`
          <div style="text-align: center; min-width: 200px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <h3 style="margin: 8px 0; color: #333; font-size: 16px;">${getLocationIcon(location.type)} ${location.name}</h3>
            <p style="margin: 8px 0; color: #666; font-size: 13px; line-height: 1.4;">${location.description}</p>
            <div style="background: ${getCrowdColor(location.crowdLevel)}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; margin: 8px 0; display: inline-block; font-weight: bold;">
              ${location.crowdLevel.toUpperCase()} CROWD
            </div>
            ${location.capacity ? `<p style="margin: 8px 0; font-size: 12px; color: #888; font-weight: 500;">${location.currentAttendance}/${location.capacity} capacity</p>` : ''}
          </div>
        \`)
        .on('click', function() {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'markerClick',
              location: ${JSON.stringify(location)}
            }));
          }
        });
    `).join('\n');

    const circlesJS = busyAreas.map(area => `
      L.circle([${area.latitude}, ${area.longitude}], {
        color: 'transparent',
        fillColor: '${getBusyAreaColor(area.intensity).replace('rgba', 'rgb').replace(/, 0\.\d+\)/, ')')}',
        fillOpacity: ${getBusyAreaColor(area.intensity).match(/0\.\d+/)?.[0] || '0.3'},
        radius: ${area.radius},
        interactive: false
      }).addTo(map);
    `).join('\n');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          #map { 
            height: 100vh; 
            width: 100vw; 
            background: #f8f9fa;
          }
          .custom-div-icon { 
            background: transparent !important; 
            border: none !important; 
          }
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          }
          .leaflet-popup-tip {
            background: white;
          }
          .leaflet-control-zoom {
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .leaflet-control-zoom a {
            border-radius: 8px;
            font-size: 18px;
            line-height: 26px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          try {
            var map = L.map('map', {
              zoomControl: true,
              scrollWheelZoom: true,
              doubleClickZoom: true,
              touchZoom: true,
              dragging: true,
              tap: true,
              tapTolerance: 15
            }).setView([40.7829, -73.9654], 16);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 19,
              minZoom: 10
            }).addTo(map);

            // Add busy areas (circles) first so they appear behind markers
            ${circlesJS}

            // Add location markers with custom icons
            ${markersJS}

            // Notify React Native that map is loaded
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'mapLoaded'
              }));
            }

            // Handle map events
            map.on('click', function(e) {
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'mapClick',
                  lat: e.latlng.lat,
                  lng: e.latlng.lng
                }));
              }
            });

          } catch (error) {
            console.error('Map initialization error:', error);
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'mapError',
                error: error.message
              }));
            }
          }
        </script>
      </body>
      </html>
    `;
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'markerClick':
          setSelectedLocation(data.location);
          setShowModal(true);
          break;
        case 'mapLoaded':
          setMapLoaded(true);
          break;
        case 'mapError':
          console.error('Map error:', data.error);
          break;
        case 'mapClick':
          // Handle general map clicks if needed
          break;
      }
    } catch (error) {
      console.log('Error parsing WebView message:', error);
    }
  };

  // Mobile WebView map
  const renderMap = () => {
    return (
      <View style={styles.mapWrapper}>
        <WebView
          source={{ html: generateMapHTML() }}
          style={styles.webview}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={false}
          scrollEnabled={false}
          bounces={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onLoadStart={() => setMapLoaded(false)}
          onLoadEnd={() => setMapLoaded(true)}
          onError={(error) => console.error('WebView error:', error)}
        />
        
        {/* Loading overlay */}
        {!mapLoaded && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Loading Map...</Text>
          </View>
        )}
      </View>
    );
  };

  // Custom marker component for React Leaflet
  const CustomMarker = ({ location }: { location: MapLocation }) => {
    if (!L) return null;

    const customIcon = L.divIcon({
      html: `<div style="background-color: ${getLocationColor(location.type)}; width: 35px; height: 35px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 3px 8px rgba(0,0,0,0.4); cursor: pointer;">${getLocationIcon(location.type)}</div>`,
      className: 'custom-div-icon',
      iconSize: [35, 35],
      iconAnchor: [17.5, 17.5]
    });

    return (
      <Marker
        position={[location.latitude, location.longitude]}
        icon={customIcon}
        eventHandlers={{
          click: () => {
            setSelectedLocation(location);
            setShowModal(true);
          }
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', minWidth: '200px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <h3 style={{ margin: '8px 0', color: '#333', fontSize: '16px' }}>
              {getLocationIcon(location.type)} {location.name}
            </h3>
            <p style={{ margin: '8px 0', color: '#666', fontSize: '13px', lineHeight: '1.4' }}>
              {location.description}
            </p>
            <div style={{
              background: getCrowdColor(location.crowdLevel),
              color: 'white',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              margin: '8px 0',
              display: 'inline-block',
              fontWeight: 'bold'
            }}>
              {location.crowdLevel.toUpperCase()} CROWD
            </div>
            {location.capacity && (
              <p style={{ margin: '8px 0', fontSize: '12px', color: '#888', fontWeight: '500' }}>
                {location.currentAttendance}/{location.capacity} capacity
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

  // React Leaflet map for web
  const renderWebMap = () => {
    if (!MapContainer || !TileLayer || !L) {
      return renderFallback();
    }

    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <MapContainer
          center={[40.7829, -73.9654]}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
            minZoom={10}
          />
          
          {/* Busy areas (circles) */}
          {busyAreas.map(area => (
            <Circle
              key={area.id}
              center={[area.latitude, area.longitude]}
              radius={area.radius}
              pathOptions={{
                color: 'transparent',
                fillColor: getBusyAreaColor(area.intensity).replace('rgba', 'rgb').replace(/, 0\.\d+\)/, ')'),
                fillOpacity: parseFloat(getBusyAreaColor(area.intensity).match(/0\.\d+/)?.[0] || '0.3'),
              }}
            />
          ))}
          
          {/* Location markers */}
          {mapLocations.map(location => (
            <CustomMarker key={location.id} location={location} />
          ))}
        </MapContainer>
        
        {/* Web Legend */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderRadius: '10px',
          padding: '12px',
          minWidth: '130px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          color: 'white',
          fontSize: '11px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>Legend</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '7px', backgroundColor: '#ff6b6b', marginRight: '10px' }}></div>
            <span>🎤 Stages</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '7px', backgroundColor: '#4ecdc4', marginRight: '10px' }}></div>
            <span>🍕 Food</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '7px', backgroundColor: '#45b7d1', marginRight: '10px' }}></div>
            <span>🏢 Facilities</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '7px', backgroundColor: '#96ceb4', marginRight: '10px' }}></div>
            <span>🚪 Entrances</span>
          </div>
        </div>
      </div>
    );
  };

  // Fallback list view
  const renderFallback = () => (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackTitle}>🗺️ Festival Locations</Text>
      <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={false}>
        {mapLocations.map(location => (
          <TouchableOpacity
            key={location.id}
            style={[styles.locationItem, { borderLeftColor: getLocationColor(location.type) }]}
            onPress={() => {
              setSelectedLocation(location);
              setShowModal(true);
            }}
          >
            <Text style={styles.locationIcon}>{getLocationIcon(location.type)}</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationDescription}>{location.description}</Text>
              <View style={[styles.crowdBadge, { backgroundColor: getCrowdColor(location.crowdLevel) }]}>
                <Text style={styles.crowdBadgeText}>{location.crowdLevel.toUpperCase()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Map Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ Festival Map</Text>
        <Text style={styles.headerSubtitle}>My event location</Text>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? renderWebMap() : renderMap()}
        
        {/* Fixed Legend - only show on mobile map */}
        {Platform.OS !== 'web' && (
          <View style={styles.fixedLegend}>
            <Text style={styles.legendTitle}>Legend</Text>
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
        )}
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
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>VIP Entrance: No wait</Text>
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
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.directionsButtonText}>
                    🧭 Close
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

export default InteractiveMap;

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
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  fallbackTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  crowdBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  crowdBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fixedLegend: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 10,
    padding: 12,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  legendTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  legendText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
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
