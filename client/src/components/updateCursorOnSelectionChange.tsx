// import { Awareness } from 'y-protocols/awareness';
// import Quill from 'quill';

// export const updateCursorOnSelectionChange = (awareness: Awareness, quill: Quill) => {
//     if (!quill || !awareness) return;

//     const handleSelectionChange = (range: { index: number; length: number } | null) => {
//         awareness.setLocalStateField('cursor', range);
//     };

//     quill.on('selection-change', handleSelectionChange);

//     return () => {
//         quill.off('selection-change', handleSelectionChange);
//     };
// };
