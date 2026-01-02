import React from 'react';
import { format, addDays, parseISO, isSameDay } from 'date-fns';
import { Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const GOAL = 65;
const CHALLENGE_DAYS = 45;

export function CalendarView({ data, todayStr, startDate }) {
    // Generate the 45 days of the challenge
    // Ideally startDate is fixed, but for now let's assume startDate is today if not set, 
    // or maybe we just show a rolling window or the last 30 days + next 15?
    // User said "For the next 45 days". Let's assume the challenge starts NOW (or the first entry date).

    const start = startDate ? parseISO(startDate) : parseISO(todayStr);

    const days = [];
    for (let i = 0; i < CHALLENGE_DAYS; i++) {
        const date = addDays(start, i);
        const dateKey = format(date, 'yyyy-MM-dd');
        const count = data[dateKey] || 0;
        const isPast = dateKey < todayStr;
        const isToday = dateKey === todayStr;
        const isComplete = count >= GOAL;

        days.push({
            date,
            dateKey,
            count,
            status: isComplete ? 'complete' : (isPast ? 'failed' : (isToday ? 'active' : 'future'))
        });
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>45 Day Challenge</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-center text-xs font-bold text-muted-foreground mb-2">
                            {d}
                        </div>
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
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
