import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, mockMessages, currentUser } from '../data/messageData';

interface MessageContextType {
  messages: Message[];
  isModalVisible: boolean;
  unreadCount: number;
  sendMessage: (text: string) => void;
  toggleModal: () => void;
  markAsRead: () => void;
  getUserColor: (sender: any) => string;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

// List of other users who can respond
const otherUsers = [
  { id: 'user1', name: 'Alex' },
  { id: 'user2', name: 'Theodora' },
  { id: 'user4', name: 'Gabin' },
  { id: 'user5', name: 'Rosen' }
];

// Color mapping for users
const userColors: { [key: string]: string } = {
  'You': '#ff6b6b',
  'Festival Staff': '#4CAF50',
  'Alex': '#f44336',
  'Theodora': '#2196F3',
  'Gabin': '#9C27B0',
  'Rosen': '#FF9800'
};

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Initial unread count

  const getUserColor = useCallback((sender: any): string => {
    const senderName = typeof sender === 'string' ? sender : sender?.name || 'Unknown';
    return userColors[senderName] || '#666';
  }, []);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sender: currentUser,
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);

    // Auto-respond after 10 seconds with a random user saying "OK"
    setTimeout(() => {
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'OK',
        timestamp: new Date(),
        sender: randomUser,
        type: 'user'
      };

      setMessages(prev => [...prev, responseMessage]);
      if (!isModalVisible) {
        setUnreadCount(prev => prev + 1);
      }
    }, 10000); // 10 seconds delay
  }, [isModalVisible]);

  const toggleModal = useCallback(() => {
    setIsModalVisible(prev => !prev);
    if (!isModalVisible) {
      // Mark as read when opening modal
      setUnreadCount(0);
    }
  }, [isModalVisible]);

  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const value: MessageContextType = {
    messages,
    isModalVisible,
    unreadCount,
    sendMessage,
    toggleModal,
    markAsRead,
    getUserColor,
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
