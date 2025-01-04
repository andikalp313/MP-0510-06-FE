'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EditEventModal } from './editEventModal'

interface Event {
  id: number
  name: string
  date: string
  tickets: number
  price: number
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Summer Music Festival', date: '2023-07-15', tickets: 500, price: 50 },
    { id: 2, name: 'Tech Conference 2023', date: '2023-09-22', tickets: 300, price: 100 },
    { id: 3, name: 'Food & Wine Expo', date: '2023-10-05', tickets: 1000, price: 25 },
  ])

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ name: '', date: '', tickets: 0, price: 0 })
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEvent({ ...newEvent, [name]: name === 'tickets' || name === 'price' ? Number(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEvents([...events, { ...newEvent, id: events.length + 1 }])
    setNewEvent({ name: '', date: '', tickets: 0, price: 0 })
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
  }

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    setEditingEvent(null)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
          <CardDescription>View and edit your current events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Available Tickets</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.tickets}</TableCell>
                    <TableCell>${event.price}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={handleUpdateEvent}
        />
      )}
    </div>
  )
}

