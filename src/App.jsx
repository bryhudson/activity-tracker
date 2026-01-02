import { useState, useEffect } from 'react'
import { Dumbbell, Calendar as CalendarIcon, BarChart3 } from 'lucide-react'
import { usePushups } from './hooks/usePushups'
import { useWater } from './hooks/useWater'
import { DailyTracker } from './components/DailyTracker'
import { WaterTracker } from './components/WaterTracker'
import { Dashboard } from './components/Dashboard'
import { CalendarView } from './components/CalendarView'
import { Quotes } from './components/Quotes'
import { Auth } from './components/Auth'
import { cn } from './lib/utils'

function App() {
  const { data, todayStr, getCountForDate, addPushups, setPushups } = usePushups()
  const { getCups, addCup, removeCup } = useWater()
  const [activeTab, setActiveTab] = useState('tracker')
  const [startDate] = useState('2025-01-01')



  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header with Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10 transition-all">
        <div className="max-w-md mx-auto p-4 pb-2 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Pushup Challenge <span className="text-xs font-normal text-muted-foreground/50">v1.1</span>
            </h1>
            <div className="text-sm font-medium text-muted-foreground">
              Day {Math.max(1, Math.floor((new Date(todayStr) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)} / 45
            </div>
          </div>
          <Auth />
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-md mx-auto px-4 pb-0">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveTab('tracker')}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 border-b-2 transition-colors",
                activeTab === 'tracker'
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Dumbbell className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 border-b-2 transition-colors",
                activeTab === 'calendar'
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <CalendarIcon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 border-b-2 transition-colors",
                activeTab === 'stats'
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Stats</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {activeTab === 'tracker' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <Quotes />

            <DailyTracker
              dateStr={todayStr}
              count={getCountForDate(todayStr)}
              onAdd={(amount) => addPushups(todayStr, amount)}
              onSet={(amount) => setPushups(todayStr, amount)}
            />

            <WaterTracker
              cups={getCups(todayStr)}
              onAdd={() => addCup(todayStr)}
              onRemove={() => removeCup(todayStr)}
            />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <CalendarView data={data} todayStr={todayStr} startDate={startDate} />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <Dashboard data={data} todayStr={todayStr} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
