// TextEditor.tsx
import 'quill/dist/quill.snow.css';
import { useAppSelector } from '@/hooks/redux.hook';
import { useCollaborativeEditor } from '@/hooks/useCollaborativeEditor';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ActiveUsers } from './ActiveUsers';


export const TextEditor = () => {
    const token = localStorage.getItem('token');
    const user = useAppSelector(state => state.user.userDetails);
    const { id: documentId } = useParams();
    const editorRef = useRef<HTMLDivElement>(null);

    if (!user || !token || !documentId) {
        return <Navigate to="/login" />;
    }

    const { initializeEditor, connectionStatus, activeUsers } = useCollaborativeEditor({
        documentId,
        token,
        user,
    });

    useEffect(() => {
        if (!editorRef.current || connectionStatus !== 'connected') {
            return;
        }

        // Initialize the editor and store the cleanup function
        const cleanup = initializeEditor(editorRef.current);

        // Return cleanup function
        return () => {
            try {
                if (cleanup && typeof cleanup === 'function') {
                    cleanup();
                }
            } catch (error) {
                console.warn('Cleanup error:', error);
            }
        };
    }, [connectionStatus, initializeEditor]);

    // Add Quill cursor styles
    // useEffect(() => {
    //     const style = document.createElement('style');
    //     style.textContent = `
    //         .ql-cursor-flag {
    //             background-color: inherit;
    //             padding: 2px 8px;
    //             color: white;
    //             border-radius: 3px;
    //             font-size: 12px;
    //             white-space: nowrap;
    //             position: absolute;
    //             top: -18px;
    //             left: 0;
    //             z-index: 50;
    //         }

    //         .ql-cursor-flag:before {
    //             content: '';
    //             position: absolute;
    //             left: -4px;
    //             top: 50%;
    //             margin-top: -4px;
    //             border: 4px solid transparent;
    //             border-right-color: inherit;
    //         }

    //         .ql-cursor {
    //             pointer-events: none;
    //             position: absolute;
    //         }

    //         .ql-cursor-caret {
    //             position: absolute;
    //             width: 2px;
    //             height: 100%;
    //             background-color: inherit;
    //         }

    //         .ql-cursor-selections {
    //             position: absolute;
    //             pointer-events: none;
    //             opacity: 0.3;
    //         }
    //     `;
    //     document.head.appendChild(style);
    //     return () => {
    //         document.head.removeChild(style);
    //     };
    // }, []);

    // In TextEditor.tsx, add this style block
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
    .ql-cursor {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 50;
    }

    .ql-cursor-flag {
      height: 24px;
      padding: 3px 5px;
      border-radius: 3px;
      margin-left: -1px;
      margin-top: -24px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
      position: absolute;
      transition: opacity .2s;
      user-select: none;
    }

    .ql-cursor-flag::before {
      content: '';
      position: absolute;
      left: 4px;
      bottom: -4px;
      border-width: 4px 4px 0;
      border-style: solid;
      border-color: inherit;
      border-right-color: transparent;
      border-left-color: transparent;
    }

    .ql-cursor-caret {
      position: absolute;
      margin-left: -1px;
      background-color: inherit;
      border-left: 2px solid;
      border-color: inherit;
      height: 100%;
    }

    .ql-cursor-hidden .ql-cursor-flag {
      opacity: 0;
    }

    .ql-cursor.hidden {
      display: none;
    }
  `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);


    return (
        <div className="h-full relative">
            {connectionStatus === 'connecting' && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-100 p-2 text-center">
                    Connecting to server...
                </div>
            )}
            {connectionStatus === 'disconnected' && (
                <div className="absolute top-0 left-0 right-0 bg-red-100 p-2 text-center">
                    Disconnected from server. Attempting to reconnect...
                </div>
            )}
            <div className="absolute top-[5px] right-4 flex items-center gap-1 z-[1000]">
                <div className="flex items-center -space-x-2">
                    {activeUsers?.map((activeUser) => (
                        <div
                            key={activeUser.userId}
                            className="active-user-avatar relative transition-transform hover:z-10"
                            title={activeUser.userName}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm hover:-translate-y-0.5 transition-transform"
                                style={{ backgroundColor: activeUser.color }}
                            >
                                {activeUser?.userName?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-full">
            <ActiveUsers users={activeUsers} />
            <div className="editorContainer h-full" ref={editorRef} />
            </div>
        </div>
    );
};



// import 'quill/dist/quill.snow.css';
// import { useAppSelector } from '@/hooks/redux.hook';
// import { useCollaborativeEditor } from '@/hooks/useCollaborativeEditor';
// import { useParams, Navigate } from 'react-router-dom';
// import { useEffect, useRef } from 'react';
// import { AwarenessProvider } from './AwarenessProvider';
// import { Awareness } from 'y-quill';
// import Quill from 'quill';
// import { updateCursorOnSelectionChange } from './updateCursorOnSelectionChange';

// export const TextEditor = () => {
//     const token = localStorage.getItem('token');
//     const user = useAppSelector(state => state.user.userDetails);
//     const { id: documentId } = useParams();
//     const editorRef = useRef<HTMLDivElement>(null);

//     if (!user || !token || !documentId) {
//         return <Navigate to="/login" />;
//     }

//     const { initializeEditor, connectionStatus, activeUsers, awareness, quill } = useCollaborativeEditor({
//         documentId,
//         token,
//         user,
//     });

//     useEffect(() => {
//         if (editorRef.current && connectionStatus === 'connected') {
//             const cleanup = initializeEditor(editorRef.current);
//             return () => {
//                 if (cleanup) cleanup();
//             };
//         }
//     }, [initializeEditor, connectionStatus]);

//     return (
//         <div className="h-full relative">
//             {connectionStatus === 'connecting' && (
//                 <div className="absolute top-0 left-0 right-0 bg-yellow-100 p-2 text-center">
//                     Connecting to server...
//                 </div>
//             )}
//             {connectionStatus === 'disconnected' && (
//                 <div className="absolute top-0 left-0 right-0 bg-red-100 p-2 text-center">
//                     Disconnected from server. Attempting to reconnect...
//                 </div>
//             )}
//             <div
//                 className="absolute top-[5px] right-4 flex items-center gap-1 z-[1000]"
//                 style={{ marginTop: '0.5rem' }}
//             >
//                 <div className="flex items-center -space-x-2">
//                     {activeUsers?.map((activeUser, index) => (
//                         <div
//                             key={activeUser.userId}
//                             className="active-user-avatar relative transition-transform hover:z-10"
//                             title={activeUser.userName}
//                         >
//                             <div
//                                 className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm hover:-translate-y-0.5 transition-transform"
//                                 style={{ backgroundColor: activeUser.color }}
//                             >
//                                 {activeUser?.userName?.charAt(0).toUpperCase()}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div
//                 className="editorContainer h-full"
//                 ref={editorRef}
//             />
//             {quill && <AwarenessProvider awareness={awareness as Awareness} quill={quill} user={user} />}
//         </div>
//     );
// };