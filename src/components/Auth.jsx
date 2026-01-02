import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function Auth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Reload to ensure anonymous auth kicks back in cleanly if needed
            window.location.reload();
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    if (!user || user.isAnonymous) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                className="text-xs h-8 ml-2"
            >
                Sign In
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2 ml-2">
            {user.photoURL ? (
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border border-border"
                    title={user.displayName}
                />
            ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-border">
                    {user.displayName ? user.displayName[0] : 'U'}
                </div>
            )}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                title="Sign Out"
            >
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
    );
}
