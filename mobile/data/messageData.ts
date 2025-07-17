export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'user' | 'system' | 'announcement';
}

export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Welcome to the festival chat! All messages with friends will be displayed here, everything is fully encrypted.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    sender: {
      id: 'system',
      name: 'Festival Bot',
    },
    type: 'system'
  },
  {
    id: '2',
    text: 'Hey everyone! Drinks @ EIT?',
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
    sender: {
      id: 'user1',
      name: 'Alex',
    },
    type: 'user'
  },
  {
    id: '4',
    text: 'ANNOUNCEMENT: The Electric Waves performance has been moved to the main stage at 9:00 PM.',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    sender: {
      id: 'admin',
      name: 'Festival Staff',
    },
    type: 'announcement'
  },
  {
    id: '5',
    text: 'No time, we need to move now!',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    sender: {
      id: 'current_user',
      name: 'You',
    },
    type: 'user'
  }
];

export const currentUser = {
  id: 'current_user',
  name: 'You',
};
