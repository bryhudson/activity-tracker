import { useState, useEffect } from 'react'
import { Dumbbell, Calendar as CalendarIcon, BarChart3 } from 'lucide-react'
import { usePushups } from './hooks/usePushups'
import { DailyTracker } from './components/DailyTracker'
import { Dashboard } from './components/Dashboard'
import { CalendarView } from './components/CalendarView'
import { cn } from './lib/utils'

function App() {
  const { data, todayStr, getCountForDate, addPushups } = usePushups()
  const [activeTab, setActiveTab] = useState('tracker')
  const [startDate, setStartDate] = useState(() => {
    return localStorage.getItem('challenge-start-date') || todayStr
  })

  useEffect(() => {
    localStorage.setItem('challenge-start-date', startDate)
  }, [startDate])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Pushup Challenge
          </h1>
          <div className="text-sm font-medium text-muted-foreground">
            Day {Math.max(1, Math.floor((new Date(todayStr) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)} / 45
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 max-w-md mx-auto w-full">
        {activeTab === 'tracker' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <DailyTracker
              dateStr={todayStr}
              count={getCountForDate(todayStr)}
              onAdd={(amount) => addPushups(todayStr, amount)}
            />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <CalendarView data={data} todayStr={todayStr} startDate={startDate} />
          </div>
        )}

        {activeTab === 'stats' && (
          <Dashboard data={data} todayStr={todayStr} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 pb-6 safe-area-pb z-50">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab('tracker')}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              activeTab === 'tracker' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Dumbbell className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              activeTab === 'calendar' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <CalendarIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              activeTab === 'stats' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Stats</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App
