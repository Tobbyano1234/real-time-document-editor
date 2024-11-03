import { io, Socket } from 'socket.io-client';

class SocketService {
  private static instance: Socket;

  public static getSocket(): Socket {
    if (!this.instance) {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        throw new Error('No authentication token found');
      }
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      if (!token) {
        throw new Error('Authentication token is required');
      }

      // Ensure proper URL formatting
      const socketURL = SERVER_URL.startsWith('http') ? SERVER_URL : `http://${SERVER_URL}`;

      this.instance = io(socketURL, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000, // Increase timeout
        autoConnect: true
      });

      // Add connection event listeners with more detailed logging
      this.instance.on('connect', () => {
        console.log('Socket connected successfully');
      });

      this.instance.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });

      this.instance.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
        if (error.message === 'Invalid token') {
          window.location.href = '/login';
        }
      });
    }

    return this.instance;
  }

  public static disconnect(): void {
    if (this.instance) {
      this.instance.disconnect();
      // this.instance = '';
    }
  }
}

export default SocketService;
