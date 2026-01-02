import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus, Trophy, Pencil, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const GOAL = 65;

export function DailyTracker({ dateStr, count, onAdd, onSet }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(count);

    const progress = Math.min(100, (count / GOAL) * 100);
    const isComplete = count >= GOAL;

    useEffect(() => {
        setInputValue(count);
    }, [count]);

    const handleSave = () => {
        const val = parseInt(inputValue);
        if (!isNaN(val) && val >= 0) {
            onSet(val);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setInputValue(count);
        setIsEditing(false);
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground uppercase tracking-wider flex flex-col items-center justify-center relative">
                    <span>Daily Progress</span>
                    <span className="text-sm font-normal text-muted-foreground/70 normal-case mt-1">
                        {format(parseISO(dateStr), 'EEEE, MMM d')}
                    </span>
                    {!isEditing && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-6 w-6 text-muted-foreground hover:text-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil className="w-3 h-3" />
                        </Button>
                    )}
                </CardTitle>

                <div className="flex items-center justify-center space-x-2 mt-2 h-16">
                    {isEditing ? (
                        <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-24 text-center text-3xl font-bold border rounded-md p-1 bg-background"
                                autoFocus
                            />
                            <div className="flex flex-col gap-1">
                                <Button size="icon" variant="outline" className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={handleSave}>
                                    <Check className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleCancel}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <span
                                className="text-6xl font-bold tracking-tighter text-primary cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setIsEditing(true)}
                                title="Click to edit"
                            >
                                {count}
                            </span>
                            <span className="text-2xl text-muted-foreground font-light">/ {GOAL}</span>
                        </>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="relative h-4 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full",
                            isComplete ? "bg-green-500" : "bg-primary"
                        )}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Status Text */}
                <div className="text-center h-8">
                    {isComplete ? (
                        <div className="flex items-center justify-center text-green-600 font-bold animate-pulse">
                            <Trophy className="w-5 h-5 mr-2" />
                            Goal Crushed!
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            {GOAL - count} more to go!
                        </p>
                    )}
                </div>

                {/* Input Buttons */}
                <div className="grid grid-cols-3 gap-3">
                    <Button
                        variant="outline"
                        className="h-20 text-xl hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all touch-manipulation"
                        onClick={() => onAdd(1)}
                    >
                        <Plus className="w-5 h-5 mr-1" /> 1
                    </Button>
                    <Button
                        variant="outline"
                        className="h-20 text-xl hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all touch-manipulation"
                        onClick={() => onAdd(5)}
                    >
                        <Plus className="w-5 h-5 mr-1" /> 5
                    </Button>
                    <Button
                        variant="outline"
                        className="h-20 text-xl font-bold border-primary/20 bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all touch-manipulation"
                        onClick={() => onAdd(10)}
                    >
                        <Plus className="w-5 h-5 mr-1" /> 10
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
