import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, subDays, parseISO } from 'date-fns';

const GOAL = 65;

export function Dashboard({ data, todayStr }) {
    // Calculate Stats
    const allDates = Object.keys(data).sort();
    const totalPushups = Object.values(data).reduce((speech, val) => speech + val, 0);

    // Calculate Streak
    let streak = 0;
    // TODO: Implement robust streak logic. For now, simple check back from yesterday
    // We'll skip this complex logic for the MVP or verify correctness later.

    // Prepare Chart Data (Last 7 Days)
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(parseISO(todayStr), i);
        const dateKey = format(date, 'yyyy-MM-dd');
        const displayDate = format(date, 'MMM d');
        chartData.push({
            date: displayDate,
            count: data[dateKey] || 0,
            fullDate: dateKey
        });
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500 fade-in">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{totalPushups}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        {/* Simple completion rate based on recorded days */}
                        <div className="text-2xl font-bold">
                            {allDates.length > 0
                                ? Math.round((allDates.filter(d => data[d] >= GOAL).length / allDates.length) * 100)
                                : 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Last 7 Days</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="date"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.count >= GOAL ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                                        fillOpacity={entry.count >= GOAL ? 1 : 0.5}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
