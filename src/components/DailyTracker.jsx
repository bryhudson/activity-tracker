import React from 'react';
import { Plus, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const GOAL = 65;

export function DailyTracker({ dateStr, count, onAdd }) {
    const progress = Math.min(100, (count / GOAL) * 100);
    const isComplete = count >= GOAL;

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                    Daily Progress
                </CardTitle>
                <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-6xl font-bold tracking-tighter text-primary">
                        {count}
                    </span>
                    <span className="text-2xl text-muted-foreground font-light">/ {GOAL}</span>
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
                        className="h-16 text-lg hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
                        onClick={() => onAdd(1)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> 1
                    </Button>
                    <Button
                        variant="outline"
                        className="h-16 text-lg hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
                        onClick={() => onAdd(5)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> 5
                    </Button>
                    <Button
                        variant="outline"
                        className="h-16 text-lg font-bold border-primary/20 bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all"
                        onClick={() => onAdd(10)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> 10
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
