// // hooks/useQuillCursors.ts
// import { useEffect } from 'react';
// import { Awareness } from 'y-protocols/awareness';
// import Quill from 'quill';
// import QuillCursors from 'quill-cursors';

// interface User {
//   _id: string;
//   name: string;
// }

// export const useQuillCursors = (quill: Quill | null, awareness: Awareness | null, user: User) => {
//   useEffect(() => {
//     if (!quill || !awareness) return;

//     const cursors = quill.getModule('cursors') as QuillCursors;
//     if (!cursors) return;

//     // Generate consistent color for user
//     const userColor = `hsl(${Math.abs(hashString(user._id)) % 360}, 70%, 45%)`;

//     // Set initial state
//     awareness.setLocalState({
//       user: {
//         id: user._id,
//         name: user.name,
//         color: userColor
//       },
//       cursor: null
//     });

//     // Handle selection changes
//     const handleSelectionChange = (range: any) => {
//       awareness.setLocalStateField('cursor', range);
//     };

//     // Handle awareness changes
//     const handleAwarenessChange = () => {
//       const states = awareness.getStates();

//       // Clean up old cursors
//       const existingCursors = cursors.cursors();
//       Object.keys(existingCursors).forEach((id) => {
//         if (!states.has(Number(id))) {
//           cursors.removeCursor(id);
//         }
//       });

//       // Update cursors
//       states.forEach((state: any, clientId: number) => {
//         if (state.user.id !== user._id && state.cursor) {
//           cursors.createCursor(state.user.id, state.user.name, state.user.color);
//           cursors.moveCursor(state.user.id, state.cursor);
//         }
//       });
//     };

//     quill.on('selection-change', handleSelectionChange);
//     awareness.on('change', handleAwarenessChange);

//     return () => {
//       quill.off('selection-change', handleSelectionChange);
//       awareness.off('change', handleAwarenessChange);
//       Object.keys(cursors.cursors()).forEach((id) => cursors.removeCursor(id));
//     };
//   }, [quill, awareness, user]);
// };

// // Consistent hash function for colors
// const hashString = (str: string) => {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = (hash << 5) - hash + str.charCodeAt(i);
//     hash = hash & hash;
//   }
//   return Math.abs(hash);
// };
