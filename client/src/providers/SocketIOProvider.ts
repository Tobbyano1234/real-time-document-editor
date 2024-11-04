// src/providers/SocketIOProvider.ts
import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import { Socket } from 'socket.io-client';

export class SocketIOProvider {
  private doc: Y.Doc;
  private socket: Socket;
  awareness: Awareness;

  constructor(socket: Socket, doc: Y.Doc) {
    this.doc = doc;
    this.socket = socket;
    this.awareness = new Awareness(doc);

    // Handle document updates
    this.doc.on('update', (update: Uint8Array) => {
      this.socket.emit('yjs-update', {
        update: Array.from(update)
      });
    });

    // Handle incoming updates
    this.socket.on('yjs-update', ({ update }) => {
      Y.applyUpdate(this.doc, new Uint8Array(update));
    });

    // Handle awareness updates
    this.awareness.on('update', () => {
      const states = Array.from(this.awareness.getStates().entries());
      this.socket.emit('awareness-update', {
        states: JSON.stringify(states)
      });
    });

    this.socket.on('awareness-update', ({ states }) => {
      const parsedStates = JSON.parse(states);
      parsedStates.forEach(([clientId, state]: [string, any]) => {
        this.awareness.setLocalStateField(clientId, state);
      });
    });
  }

  destroy() {
    this.socket.off('yjs-update');
    this.socket.off('awareness-update');
    this.awareness.destroy();
    this.doc.destroy();
  }
}
