import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';

const QUOTES = [
    "Don't count the days, make the days count.",
    "Discipline is doing what needs to be done, even if you don't want to.",
    "Your future is created by what you do today, not tomorrow.",
    "Pain is temporary. Quitting lasts forever.",
    "The only bad workout is the one that didn't happen.",
    "Success starts with self-discipline.",
    "You don't have to be great to start, but you have to start to be great.",
    "Sweat is just fat crying.",
    "Motivation is what gets you started. Habit is what keeps you going.",
    "Push yourself, because no one else is going to do it for you."
];

export function Quotes() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        // Pick a random quote based on the day of the year so it stays same for the day?
        // Or just random on mount? Let's do random on mount for variety.
        const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(random);
    }, []);

    return (
        <Card className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-none shadow-none mb-6">
            <CardContent className="p-4 flex gap-3 items-start">
                <span className="text-2xl text-purple-500 font-serif leading-none">"</span>
                <p className="text-sm font-medium italic text-muted-foreground">
                    "{quote}"
                </p>
            </CardContent>
        </Card>
    );
}
