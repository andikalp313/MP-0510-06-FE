import { BarChart, Calendar, Users, CreditCard } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

export function AppSidebar({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <Sidebar className="w-full h-full bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-lg font-semibold">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab('statistics')} className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Statistics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab('events')} className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Events</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab('transactions')} className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Transactions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab('attendees')} className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Attendees</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

