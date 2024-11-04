import { useRef, useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { Socket, io } from 'socket.io-client';
import { Awareness } from 'y-protocols/awareness';
import QuillCursors from 'quill-cursors';
import { TOOLBAR_OPTIONS } from '../constants';
import { Delta } from 'quill/core';
import { SocketIOProvider } from '../providers/SocketIOProvider';


// Register the cursors module
Quill.register('modules/cursors', QuillCursors);


// Socket.IO configuration
const SOCKET_URL = 'ws://localhost:4500'; // Make sure this matches your server URL
const SOCKET_OPTIONS = {
  reconnectionDelayMax: 10000,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  autoConnect: false, // We'll manually connect
};

interface User {
  name: string;
  _id: string;
}

interface UseCollaborativeEditorProps {
  documentId: string;
  token: string;
  user: User;
}

interface EditorState {
  quill: Quill | null;
  socket: Socket | null;
  ydoc: Y.Doc | null;
  binding: QuillBinding | null;
  awareness: Awareness | null;
  undoManager: Y.UndoManager | null;
  cursors: QuillCursors | null;
  provider: SocketIOProvider | null;
}

export const useCollaborativeEditor = ({
  documentId,
  token,
  user,
}: UseCollaborativeEditorProps) => {
  const editorState = useRef<EditorState>({
    quill: null,
    socket: null,
    ydoc: null,
    binding: null,
    awareness: null,
    undoManager: null,
    cursors: null,
    provider: null
  });
  const [activeUsers, setActiveUsers] = useState<Array<{
    userId: string;
    userName: string;
    color: string;
  }>>([]);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      ...SOCKET_OPTIONS,
      auth: { token }
    });

    // Socket event handlers
    const handleConnect = () => {
      console.log('Socket connected');
      setConnectionStatus('connected');

      // If we have a document ID, join the room
      if (documentId) {
        socket.emit('join-document', { documentId });
        console.log('Joined document', documentId);
      }
    };

    const handleConnectError = (error: Error) => {
      console.error('Socket connection error:', error);
      // Check if error has statusCode property
      if (error.message === 'Socket data error: userToken required') {
        window.location.href = '/login';
        return;
      }
      setConnectionStatus('disconnected');
    };

    const handleDisconnect = (reason: string) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');

      // If the disconnection wasn't initiated by the client, attempt to reconnect
      if (reason !== 'io client disconnect') {
        setConnectionStatus('connecting');
        setTimeout(() => {
          if (socket && !socket.connected) {
            socket.connect();
          }
        }, 1000);
      }
    };

    // Set up socket event listeners
    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);
    socket.on('disconnect', handleDisconnect);

    // Store socket reference
    editorState.current.socket = socket;

    // Connect the socket
    setConnectionStatus('connecting');
    socket.connect();

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect();
    };
  }, [documentId, token]);

  const initializeEditor = useCallback((element: HTMLDivElement | null) => {
    if (!element || !editorState.current.socket || connectionStatus !== 'connected') {
      return;
    }

    element.innerHTML = '';
    const editor = document.createElement('div');
    element.append(editor);

    try {
      const quillInstance = new Quill(editor, {
        theme: 'snow',
        modules: {
          toolbar: TOOLBAR_OPTIONS,
          cursors:
          {
            transformOnTextChange: true,
            hideDelayMs: 5000,
            hideSpeedMs: 500,
            selectionChangeSource: null
          },
          history: {
            userOnly: true
          }
        }
      });

      // Initialize YJS
      const ydoc = new Y.Doc();
      const ytext = ydoc.getText('quill');
      const awareness = new Awareness(ydoc);
      const provider = new SocketIOProvider(editorState.current.socket, ydoc);

      // Set awareness state
      provider.awareness.setLocalState({
        user: {
          id: user._id,
          name: user.name,
          color: `hsl(${Math.abs(user._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360}, 70%, 45%)`
        },
        cursor: null
      });
      const binding = new QuillBinding(ytext, quillInstance, provider.awareness);

      // Initialize UndoManager
      const undoManager = new Y.UndoManager(ytext, {
        trackedOrigins: new Set([binding, 'keyboard'])
      });

      quillInstance.keyboard.addBinding({ key: 'Z', shortKey: true }, {
        handler: function () {
          const currentState = Y.encodeStateVector(editorState.current.ydoc!);
          undoManager.undo();

          socket.emit('undo-action', {
            documentId,
            userId: user._id,
            state: currentState // YJS state vector
          });
          return false;
        }
      });

      quillInstance.keyboard.addBinding({ key: 'Z', shortKey: true, shiftKey: true }, {
        handler: function () {
          const currentState = Y.encodeStateVector(editorState.current.ydoc!);
          undoManager.redo();

          socket.emit('redo-action', {
            documentId,
            userId: user._id,
            state: currentState // YJS state vector
          });
          return false;
        }
      });

      editorState.current.quill = quillInstance;

      const cursors = quillInstance.getModule('cursors') as any;

      const userColor = getRandomColor(user._id);
      editorState.current.cursors = cursors;

      const socket = editorState.current.socket!;

      // Store undoManager in state
      editorState.current = {
        ...editorState.current,
        undoManager,
        provider
      };

      quillInstance.on('selection-change', (range) => {
        console.log("selection change", range)
        if (range) {
          provider.awareness.setLocalStateField('cursor', range);
          socket.emit('cursor-update', {
            documentId,
            userId: user._id,
            userName: user.name,
            range,
            color: getRandomColor(user._id)
          });
        }
      });

      // Handle awareness changes for cursors
      provider.awareness.on('change', () => {
        const states = Array.from(provider.awareness.getStates().entries());
        states.forEach(([_clientId, state]) => {
          if (state?.user && state.user.id !== user._id) {
            try {
              cursors.createCursor(
                state.user.id,
                state.user.name,
                state.user.color
              );
              if (state.cursor) {
                cursors.moveCursor(state.user.id, state.cursor);
              }
            } catch (e) {
              console.warn('Error updating cursor:', e);
            }
          }
        });
      });

      // Document loading handler
      const handleLoadDocument = (document: any) => {
        try {
          console.log('Loading document:', document);
          if (document?.data?.content) {
            // Ensure we're loading the complete Delta with attributes
            const delta = {
              ops: document.data.content.ops.map((op: any) => {
                // Create a new operation object preserving all properties
                const newOp: any = {};

                // Handle insert
                if (op.insert !== undefined) {
                  newOp.insert = op.insert;
                }

                // Handle delete
                if (op.delete !== undefined) {
                  newOp.delete = op.delete;
                }

                // Handle retain
                if (op.retain !== undefined) {
                  newOp.retain = op.retain;
                }

                // Handle attributes - ensure they're properly copied
                if (op.attributes) {
                  newOp.attributes = { ...op.attributes };
                }
                return newOp;
              })
            };
            console.log('Setting contents with delta:', delta);
            // Set the contents with the complete Delta
            quillInstance.setContents(new Delta(delta), 'api');
          }
          quillInstance.enable();
        } catch (error) {
          console.error('Error loading document:', error);
        }
      };

      // Text change handler
      quillInstance.on('text-change', (delta, _oldDelta, source) => {
        if (source === 'user') {
          // Emit changes to other users
          socket.emit('doc-update', {
            documentId,
            content: delta
          });

          // Debounced save of the full document content
          if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
          }
          console.log(quillInstance.getContents())
          saveTimeoutRef.current = setTimeout(() => {
            const fullDelta = quillInstance.getContents();
            socket.emit('save-document', {
              documentId,
              content: {
                ops: fullDelta.ops.map(op => {
                  // Preserve all attributes and operations
                  const newOp: any = {};
                  if (op.insert !== undefined) newOp.insert = op.insert;
                  if (op.delete !== undefined) newOp.delete = op.delete;
                  if (op.retain !== undefined) newOp.retain = op.retain;
                  if (op.attributes) newOp.attributes = { ...op.attributes };
                  return newOp;
                })
              }
            });
          }, 2000);
        }
      });
      // Join document with user info
      socket.emit('join-document', {
        documentId,
        userId: user._id,
        userName: user.name,
        userColor
      });

      // Handle active users update
      socket.on('active-users', (users) => {
        // Filter out current user and transform data if needed
        setActiveUsers(
          users
            .filter((u: { userId: { toString: () => string; }; }) => u.userId.toString() !== user._id)
            .map((u: { userId: { toString: () => any; }; userName: any; color: any; }) => ({
              userId: u.userId.toString(),
              userName: u.userName,
              color: u.color
            }))
        );
      });

      // Handle disconnection
      socket.on('user-left', (userId) => {
        setActiveUsers(prev => prev.filter(u => u.userId !== userId));
      });

      // Add these socket listeners
      socket.on('remote-undo', ({ userId, state }) => {
        if (userId !== user._id) {
          const ydoc = editorState.current.ydoc;
          if (ydoc) {
            Y.applyUpdate(ydoc, state);
            editorState.current.undoManager?.undo();
          }
        }
      });

      socket.on('remote-redo', ({ userId, state }) => {
        if (userId !== user._id) {
          const ydoc = editorState.current.ydoc;
          if (ydoc) {
            Y.applyUpdate(ydoc, state);
            editorState.current.undoManager?.redo();
          }
        }
      });

      // const handleCursorUpdate = ({ userId, userName, range, color }) => {
      //   if (userId !== user._id) {
      //     try {
      //       const cursors = quillInstance.getModule('cursors') as any;

      //       // Create cursor if it doesn't exist
      //       if (!cursors.cursors[userId]) {
      //         cursors.createCursor(userId, userName, color);
      //       }

      //       // Update cursor position
      //       if (range) {
      //         cursors.moveCursor(userId, range);
      //       } else {
      //         cursors.removeCursor(userId);
      //       }
      //     } catch (error) {
      //       console.error('Error updating cursor:', error);
      //     }
      //   }
      // };


      // Handle remote changes
      socket.on('receive-changes', (delta: any) => {
        quillInstance.updateContents(delta);
      });

      // Selection change handler
      quillInstance.on('selection-change', (range) => {
        if (range) {
          socket.emit('cursor-update', {
            documentId,
            userId: user._id,
            userName: user.name,
            range,
            color: userColor
          });
        }
      });

      socket.emit('get-document', { documentId }, (document: any) => {
        console.log('Document received:', document);
        if (document) {
          handleLoadDocument(document);
        }
      });

      // Store references
      editorState.current = {
        quill: quillInstance,
        socket: editorState.current.socket,
        ydoc,
        binding,
        awareness,
        undoManager: new Y.UndoManager(ytext),
        cursors,
        provider
      };
      console.log("last cursor instance>>>>>>>", cursors)

      // ... cursor CSS styles ...
      const style = document.createElement('style');
      style.textContent = `
        .ql-cursor-flag {
          background-color: inherit;
          color: white;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .ql-cursor-flag:before {
        content: '';
        position: absolute;
        left: -4px;
        top: 50%;
        margin-top: -4px;
        border: 4px solid transparent;
        border-right-color: inherit;
      }

      .ql-cursor {
        pointer-events: none;
        position: absolute;
      }

        .ql-cursor-caret {
          position: absolute;
          width: 2px;
        }

        .ql-cursor.hidden .ql-cursor-flag {
          opacity: 0;
        }
      `;

      document.head.appendChild(style);

      // Handle remote cursor updates
      socket.on('cursor-update', ({ userId, userName, range, color }) => {
        if (userId !== user._id) {
          try {

            // Create or update cursor
            if (!cursors.cursors[userId]) {
              cursors.createCursor(userId, userName, color);
            }

            if (range) {
              cursors.moveCursor(userId, range);
            } else {
              cursors.removeCursor(userId);
            }
          } catch (error) {
            console.error('Error updating cursor:', error);
          }
        }
      });

      // socket.on('cursor-update', ({ userId, userName, range, color }) => {
      //   handleCursorUpdate({ userId, userName, range, color });
      // });
      // socket.on('cursor-update', handleCursorUpdate);



      // Cleanup function
      // return () => {
      //   if (binding) binding.destroy();
      //   if (ydoc) ydoc.destroy();
      //   if (awareness) awareness.destroy();
      //   if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      //   socket.off('load-document', handleLoadDocument);
      //   socket.off('receive-changes');
      //   socket.emit('leave-document', {
      //     documentId,
      //     userId: user._id
      //   });
      //   socket.off('active-users');
      //   socket.off('user-left');
      //   element.innerHTML = '';
      // };
      return () => cleanup(element);
    } catch (error) {
      console.error('Error initializing editor:', error);
      element.innerHTML = 'Error initializing editor. Please refresh the page.';
    }
  }, [documentId, user, connectionStatus]);

  const cleanup = (element: HTMLElement) => {
    try {
      // Clean up YJS bindings
      if (editorState.current.binding) {
        editorState.current.binding.destroy();
      }

      // Clean up YDoc
      if (editorState.current.ydoc) {
        editorState.current.ydoc.destroy();
      }

      // Clean up awareness
      if (editorState.current.awareness) {
        // Remove all cursors first
        const cursors = editorState.current.quill?.getModule('cursors') as any;
        if (cursors) {
          const existingCursors = cursors.cursors?.() || {};
          Object.keys(existingCursors).forEach(id => {
            try {
              cursors.removeCursor?.(id);
            } catch (e) {
              console.warn('Error removing cursor:', e);
            }
          });
        }

        editorState.current.awareness.destroy();
      }

      // Clear any pending timeouts
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Remove socket listeners
      if (editorState.current.socket) {
        const socket = editorState.current.socket;
        socket.off('load-document');
        socket.off('receive-changes');
        socket.off('cursor-update');
        socket.off('active-users');
        socket.off('user-left');

        // Notify server about leaving
        socket.emit('leave-document', {
          documentId,
          userId: user._id
        });
      }

      // Clear editor content
      if (element) {
        element.innerHTML = '';
      }
    } catch (error) {
      console.warn('Cleanup error:', error);
    }
  };


  useEffect(() => {
    return () => {
      const { binding, ydoc, awareness } = editorState.current;
      if (binding) binding.destroy();
      if (ydoc) ydoc.destroy();
      if (awareness) awareness.destroy();
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (editorState.current.socket) {
      editorState.current.socket.on('active-users', (users) => {
        setActiveUsers(users);
      });

      return () => {
        editorState.current.socket?.off('active-users');
      };
    }
  }, []);

  useEffect(() => {
    const { socket, ydoc, awareness } = editorState.current;
    if (!socket || !ydoc || !awareness) return;

    // Handle YJS updates
    ydoc.on('update', (update: Uint8Array) => {
      socket.emit('yjs-update', {
        documentId,
        update: Array.from(update)
      });
    });

    // Handle remote YJS updates
    socket.on('yjs-update', ({ update }) => {
      Y.applyUpdate(ydoc, new Uint8Array(update));
    });

    // Handle awareness updates
    awareness.on('change', () => {
      const states = Array.from(awareness.getStates().entries());
      socket.emit('awareness-update', {
        documentId,
        states: JSON.stringify(states)
      });
    });

    socket.on('awareness-update', ({ states }) => {
      const parsedStates = JSON.parse(states);
      parsedStates.forEach(([clientId, state]: [string, any]) => {
        awareness.setLocalStateField(clientId, state);
      });
    });

    return () => {
      socket.off('yjs-update');
      socket.off('awareness-update');
    };
  }, [documentId]);

  return { initializeEditor, connectionStatus, activeUsers };
};


const getRandomColor = (userId: string) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
};
