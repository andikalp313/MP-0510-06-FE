'use client'

import { useState, useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import AttendeeList from './attendees/attendeesList'
import { AppSidebar } from './sideBar'
import { TopBar } from './topBar'
import EventManagement from './events/eventList'
import TransactionManagement from './transactions/transactions'
import Statistics from './overview/overview'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('statistics')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the breakpoint for md in Tailwind
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0`}
        >
          <AppSidebar setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'statistics' && <Statistics />}
              {activeTab === 'events' && <EventManagement />}
              {activeTab === 'transactions' && <TransactionManagement />}
              {activeTab === 'attendees' && <AttendeeList />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

