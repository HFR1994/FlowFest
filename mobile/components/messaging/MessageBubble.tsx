import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message, currentUser } from '../../data/messageData';
import { useMessages } from '../../contexts/MessageContext';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { getUserColor } = useMessages();
  const isCurrentUser = message.sender.id === currentUser.id;
  const isSystem = message.type === 'system';
  const isAnnouncement = message.type === 'announcement';
  const userColor = getUserColor(message.sender);

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isSystem || isAnnouncement) {
    return (
      <View style={styles.systemMessageContainer}>
        <View style={[
          styles.systemBubble,
          isAnnouncement && styles.announcementBubble
        ]}>
          <Text style={[
            styles.systemText,
            isAnnouncement && styles.announcementText
          ]}>
            {message.text}
          </Text>
          <Text style={styles.systemTime}>
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[
      styles.messageContainer,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      <View style={[
        styles.messageBubble,
        isCurrentUser ? styles.currentUserBubble : [styles.otherUserBubble, { backgroundColor: userColor + '20' }]
      ]}>
        {!isCurrentUser && (
          <Text style={[styles.senderName, { color: userColor }]}>{message.sender.name}</Text>
        )}
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.messageTime,
          isCurrentUser ? styles.currentUserTime : styles.otherUserTime
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  currentUserContainer: {
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  currentUserBubble: {
    backgroundColor: '#ff6b6b',
    borderBottomRightRadius: 5,
  },
  otherUserBubble: {
    backgroundColor: '#333',
    borderBottomLeftRadius: 5,
  },
  senderName: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: '#fff',
  },
  otherUserText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  currentUserTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherUserTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  systemBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '90%',
  },
  announcementBubble: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.5)',
  },
  systemText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  announcementText: {
    color: '#ffc107',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  systemTime: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});
