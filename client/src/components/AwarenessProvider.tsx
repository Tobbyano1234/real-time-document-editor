// import React, { useEffect } from 'react';
// import { Awareness } from 'y-protocols/awareness';
// import Quill from 'quill';
// import { useAwarenessState } from '@/hooks/useAwarenessState';
// import { useCursorManagement } from '@/hooks/useCursorManagement';
// import { updateCursorOnSelectionChange } from '@/components/updateCursorOnSelectionChange';

// interface User {
//     _id: string;
//     name: string;
//     color: string;
// }

// interface AwarenessProviderProps {
//     awareness: Awareness;
//     quill: Quill;
//     user: User;
// }

// export const AwarenessProvider: React.FC<AwarenessProviderProps> = ({ awareness, quill, user }) => {
//     useAwarenessState(awareness, user);
//     useCursorManagement(awareness, quill, user._id);

//     useEffect(() => {
//         if (awareness && quill) {
//             updateCursorOnSelectionChange(awareness, quill);
//         }
//     }, [awareness, quill]);

//     return null; // This component manages state but does not render anything itself
// };
