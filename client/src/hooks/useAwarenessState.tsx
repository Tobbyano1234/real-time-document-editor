import { useEffect, useState } from 'react';
import { Awareness } from 'y-protocols/awareness';

interface User {
    _id: string;
    name: string;
    color: string;
}

export const useAwarenessState = (awareness: Awareness | null, user: User) => {
    const [awarenessState, setAwarenessState] = useState(null);

    useEffect(() => {
        if (!awareness) return;

        // Set local awareness state
        awareness.setLocalState({
            user: {
                id: user?._id,
                name: user?.name,
                color: user?.color,
            },
            cursor: null,
        });

        // Track awareness state
        const handleAwarenessUpdate = () => {
            const states = awareness.getStates();
            const statesArray = Array.from(states.values()) as Array<{
                user: {
                    id: string;
                    name: string;
                    color: string;
                };
                cursor: null | { x: number; y: number };
            }>;
            setAwarenessState(statesArray as any);
        };

        awareness.on('update', handleAwarenessUpdate);

        // Cleanup
        return () => {
            awareness.setLocalState(null);
            awareness.off('update', handleAwarenessUpdate);
        };
    }, [awareness, user]);

    return awarenessState;
};
