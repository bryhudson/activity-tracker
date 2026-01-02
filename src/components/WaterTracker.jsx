import React from 'react';
import { Plus, Minus, Droplets } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const GOAL_CUPS = 8;
const CUP_L = 0.25;

export function WaterTracker({ cups, onAdd, onRemove }) {
    const liters = cups * CUP_L;
    const goalLiters = GOAL_CUPS * CUP_L;
    const progress = Math.min(100, (cups / GOAL_CUPS) * 100);

    return (
        <Card className="w-full max-w-md mx-auto shadow-sm border-2 border-blue-500/10 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Droplets className="w-5 h-5" />
                    Hydration
                </CardTitle>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {liters}L <span className="text-sm font-normal text-muted-foreground">/ {goalLiters}L</span>
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                        ({cups} cups)
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Visual Cups */}
                <div className="flex justify-between px-2">
                    {Array.from({ length: GOAL_CUPS }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-6 h-8 rounded-sm border-2 transition-all duration-300",
                                i < cups
                                    ? "bg-blue-500 border-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                    : "bg-transparent border-blue-200 dark:border-blue-800"
                            )}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-center pt-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
                        onClick={onRemove}
                        disabled={cups <= 0}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                        onClick={onAdd}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Drink Water (+250ml)
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
