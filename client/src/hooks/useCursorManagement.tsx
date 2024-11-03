// import { useEffect } from 'react';
// import { Awareness } from 'y-protocols/awareness';
// import Quill from 'quill';
// import QuillCursors from 'quill-cursors';

// export const useCursorManagement = (awareness: Awareness, quill: Quill, localUserId: string) => {
//   useEffect(() => {
//       console.log('am called useCursorManagement');
//         if (!quill || !awareness) return;

//         const cursors = quill.getModule('cursors') as QuillCursors;
//         if (!cursors) {
//             console.warn('Cursors module not found');
//             return;
//         }

//         const handleAwarenessChange = () => {
//             const states = awareness.getStates();
            
//             // Remove old cursors
//             const existingCursors = cursors.cursors() || {};
//             Object.keys(existingCursors).forEach(id => {
//                 if (!states.has(Number(id))) {
//                     cursors.removeCursor(id);
//                 }
//             });
//             // Update cursors for all users
//             states.forEach((state: any, clientId: number) => {
//                 const strClientId = String(clientId);
//                 if (strClientId !== localUserId && state.cursor) {
//                     const { cursor, user } = state;
//                     cursors.createCursor(strClientId, user.name, user.color);
//                     cursors.moveCursor(strClientId, cursor);
//                 }
//             });
//         };

//         awareness.on('change', handleAwarenessChange);
        
//         return () => {
//             awareness.off('change', handleAwarenessChange);
//             // Clean up cursors
//             Object.keys(cursors.cursors()).forEach(id => {
//                 cursors.removeCursor(id);
//             });
//         };
//     }, [awareness, quill, localUserId]);
// };
