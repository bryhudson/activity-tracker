import { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const STORAGE_KEY = 'pushup-challenge-data';

export function usePushups() {
    // Start with local storage for instant render, then sync with cloud
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    const [user, setUser] = useState(null);

    // 1. Authenticate anonymously
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
            } else {
                signInAnonymously(auth).catch((error) => {
                    console.error("Auth failed", error);
                });
            }
        });
        return () => unsubscribe();
    }, []);

    // 2. Sync with Firestore
    useEffect(() => {
        if (!user) return;

        const docRef = doc(db, "users", user.uid);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const cloudData = docSnap.data().pushups || {};
                setData(cloudData);
                // Also update local storage for offline backup/faster load next time
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
            } else {
                // If cloud is empty but we have local data, MIGRATE IT UP!
                if (Object.keys(data).length > 0) {
                    await setDoc(docRef, { pushups: data }, { merge: true });
                }
            }
        });

        return () => unsubscribe();
    }, [user]); // Run when user is authenticated

    const todayStr = format(startOfToday(), 'yyyy-MM-dd');

    const getCountForDate = (dateStr) => {
        return data[dateStr] || 0;
    };

    const updateCloud = async (newData) => {
        // Optimistic update
        setData(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData)); // Backup immediately
        if (user) {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, { pushups: newData }, { merge: true });
        }
    };

    const addPushups = (dateStr, count) => {
        const newData = {
            ...data,
            [dateStr]: (data[dateStr] || 0) + count
        };
        updateCloud(newData);
    };

    const setPushups = (dateStr, count) => {
        const newData = {
            ...data,
            [dateStr]: count
        };
        updateCloud(newData);
    };

    return {
        data,
        todayStr,
        getCountForDate,
        addPushups,
        setPushups
    };
}
