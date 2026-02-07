// Mock incoming messages from other users chasing you to collect your clothes
export interface IncomingMessage {
  id: number;
  fromUserId: number;
  fromUserName: string;
  telegramHandle: string;
  message: string;
  timestamp: Date;
  read: boolean;
  machineNumber?: string;
  block?: string;
}

export const mockIncomingMessages: IncomingMessage[] = [
  {
    id: 1,
    fromUserId: 1,
    fromUserName: "Koon Wei",
    telegramHandle: "@koonwei6767",
    message: "Bro can collect your clothes anot? Been 10 min over already leh 😤",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    machineNumber: "Level 2-W2",
    block: "Block 2"
  },
  {
    id: 2,
    fromUserId: 2,
    fromUserName: "Zi Phong",
    telegramHandle: "@ziphong",
    message: "Oi! Your clothes still inside the dryer leh! I need to use sia 😠",
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    read: false,
    machineNumber: "Level 3-D4",
    block: "Block 2"
  }
];

// Function to get unread message count
export function getUnreadMessageCount(): number {
  return mockIncomingMessages.filter(msg => !msg.read).length;
}

// Function to mark message as read
export function markMessageAsRead(messageId: number): void {
  const message = mockIncomingMessages.find(msg => msg.id === messageId);
  if (message) {
    message.read = true;
  }
}
