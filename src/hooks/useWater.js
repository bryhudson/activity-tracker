import { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';

const STORAGE_KEY_WATER = 'water-tracker-data';

export function useWater() {
    const [waterData, setWaterData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_WATER);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_WATER, JSON.stringify(waterData));
    }, [waterData]);

    const todayStr = format(startOfToday(), 'yyyy-MM-dd');

    const getCups = (dateStr) => {
        return waterData[dateStr] || 0;
    };

    const addCup = (dateStr) => {
        setWaterData(prev => ({
            ...prev,
            [dateStr]: (prev[dateStr] || 0) + 1
        }));
    };

    const removeCup = (dateStr) => {
        setWaterData(prev => {
            const current = prev[dateStr] || 0;
            if (current <= 0) return prev;
            return {
                ...prev,
                [dateStr]: current - 1
            };
        });
    };

    return {
        getCups,
        addCup,
        removeCup
    };
}
