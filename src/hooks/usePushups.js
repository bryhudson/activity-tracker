import { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';

const STORAGE_KEY = 'pushup-challenge-data';

export function usePushups() {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const todayStr = format(startOfToday(), 'yyyy-MM-dd');

    const getCountForDate = (dateStr) => {
        return data[dateStr] || 0;
    };

    const addPushups = (dateStr, count) => {
        setData(prev => ({
            ...prev,
            [dateStr]: (prev[dateStr] || 0) + count
        }));
    };

    const setPushups = (dateStr, count) => {
        setData(prev => ({
            ...prev,
            [dateStr]: count
        }));
    };

    return {
        data,
        todayStr,
        getCountForDate,
        addPushups,
        setPushups
    };
}
