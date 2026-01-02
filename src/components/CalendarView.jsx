import React from 'react';
import { format, addDays, parseISO, isSameDay, startOfMonth } from 'date-fns';
import { Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const GOAL = 65;
const CHALLENGE_DAYS = 45;

export function CalendarView({ data, todayStr, startDate }) {
    const start = startDate ? parseISO(startDate) : parseISO(todayStr);

    // Group days by month
    const months = {};

    for (let i = 0; i < CHALLENGE_DAYS; i++) {
        const date = addDays(start, i);
        const dateKey = format(date, 'yyyy-MM-dd');
        const monthKey = format(date, 'MMMM yyyy'); // e.g. "January 2026"

        if (!months[monthKey]) {
            months[monthKey] = [];
        }

        const count = data[dateKey] || 0;
        const isPast = dateKey < todayStr;
        const isToday = dateKey === todayStr;
        const isComplete = count >= GOAL;

        months[monthKey].push({
            date,
            dateKey,
            count,
            status: isComplete ? 'complete' : (isPast ? 'failed' : (isToday ? 'active' : 'future'))
        });
    }

    return (
        <div className="space-y-6">
            {Object.entries(months).map(([monthTitle, days]) => (
                <Card key={monthTitle} className="w-full">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{monthTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                <div key={i} className="text-center text-xs font-bold text-muted-foreground mb-2">
                                    {d}
                                </div>
                            ))}

                            {/* Add padding for the first day of the month if needed, 
                                but since these are arbitrary 45 days, maybe we just list them? 
                                A true calendar aligns with days of week. 
                                Let's try to align them to the correct column. */}
                            {Array.from({ length: days[0].date.getDay() }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {days.map((day, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "aspect-square rounded-md flex flex-col items-center justify-center border text-xs relative",
                                        day.status === 'complete' && "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400",
                                        day.status === 'failed' && "bg-destructive/5 border-destructive/20 text-muted-foreground opacity-50",
                                        day.status === 'active' && "ring-2 ring-primary ring-offset-2 border-primary",
                                        day.status === 'future' && "bg-secondary/50 border-transparent text-muted-foreground/30"
                                    )}
                                >
                                    <span className="font-semibold">{format(day.date, 'd')}</span>
                                    {day.status === 'complete' && <Check className="w-3 h-3 mt-1" />}
                                    {/* {day.status === 'failed' && <X className="w-3 h-3 mt-1" />} */}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
