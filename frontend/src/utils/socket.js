import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Initialize the socket client with autoConnect disabled
// to trigger it specifically upon user authentication/project entry.
export const socket = io(BACKEND_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  withCredentials: true
});

// Helper functions to manage rooms
export const joinProjectRoom = (projectId) => {
  if (socket.disconnected) socket.connect();
  socket.emit('join_project', projectId);
};

export const leaveProjectRoom = (projectId) => {
  socket.emit('leave_project', projectId);
};

export const joinPokerRoom = (taskId) => {
  if (socket.disconnected) socket.connect();
  socket.emit('join_card_poker', taskId);
};

export const leavePokerRoom = (taskId) => {
  socket.emit('leave_card_poker', taskId);
};
