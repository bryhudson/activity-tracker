import { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const STORAGE_KEY_WATER = 'water-tracker-data';

export function useWater() {
    const [waterData, setWaterData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_WATER);
        return saved ? JSON.parse(saved) : {};
    });

    const [user, setUser] = useState(null);

    // 1. Listen for Auth (Relies on App or usePushups starting the sign-in, but safe to check here)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) setUser(u);
        });
        return () => unsubscribe();
    }, []);

    // 2. Sync with Firestore
    useEffect(() => {
        if (!user) return;

        const docRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const cloudData = docSnap.data().water || {};
                setWaterData(cloudData);
                localStorage.setItem(STORAGE_KEY_WATER, JSON.stringify(cloudData));
            } else {
                // Migration: If cloud doc doesn't exist or has no water, upload local
                if (Object.keys(waterData).length > 0) {
                    await setDoc(docRef, { water: waterData }, { merge: true });
                }
            }
        });

        return () => unsubscribe();
    }, [user]);

    const todayStr = format(startOfToday(), 'yyyy-MM-dd');

    const getCups = (dateStr) => {
        return waterData[dateStr] || 0;
    };

    const updateCloud = async (newData) => {
        setWaterData(newData);
        localStorage.setItem(STORAGE_KEY_WATER, JSON.stringify(newData)); // Backup immediately
        if (user) {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, { water: newData }, { merge: true });
        }
    };

    const addCup = (dateStr) => {
        const newData = {
            ...waterData,
            [dateStr]: (waterData[dateStr] || 0) + 1
        };
        updateCloud(newData);
    };

    const removeCup = (dateStr) => {
        if ((waterData[dateStr] || 0) <= 0) return;

        const newData = {
            ...waterData,
            [dateStr]: (waterData[dateStr] || 0) - 1
        };
        updateCloud(newData);
    };

    return {
        getCups,
        addCup,
        removeCup
    };
}
