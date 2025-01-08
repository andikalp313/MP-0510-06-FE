"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RoleGuard from "@/hoc/roleGuard";
import useGetEventsByUser from "@/hooks/api/event/useGetEventsByUser";
import { useAppSelector } from "@/redux/hooks";
import { updateUserAction } from "@/redux/slices/userslice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditEventModal } from "./editEventModal";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; 
  location: string;
  priceReguler: number;
  priceVip: number;
  priceVvip: number;
  avaliableSeatsReguler: string;
  avaliableSeatsVip: string;
  avaliableSeatsVvip: string;
  eventCategory: string;
  endDate: string;
  user: {
    name: string;
  };
}

function EventPage() {
  const user = useAppSelector((state) => state.user); 
  const userId = user.id; 
  const { data: events = [], isLoading, isError } = useGetEventsByUser( );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("exploretix-storage");
    if (storedUser) {
      dispatch(updateUserAction(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const formatDate = (dateString: string) => {  
    const date = new Date(dateString);  
    const day = String(date.getDate()).padStart(2, '0');  
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0  
    const year = date.getFullYear();  
    return `${day}/${month}/${year}`;  
  };

  // const handleUpdateEvent = (updatedEvent: Event) => {
  //   // Update event dalam state
  //   setEvents((prevEvents) =>
  //     prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
  //   );
  //   setEditingEvent(null);
  // };

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (isError) {
    return <p>Error fetching events.</p>;
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
                  <TableHead>City</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>VVIP Tic</TableHead>
                  <TableHead>VIP Tic</TableHead>
                  <TableHead>REG Tic</TableHead>
                  <TableHead>VVIP Rp.</TableHead>
                  <TableHead>VIP Rp.</TableHead>
                  <TableHead>REG Rp.</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{formatDate(event.startDate)}</TableCell>
                    <TableCell>{event.avaliableSeatsVvip}</TableCell>
                    <TableCell>{event.avaliableSeatsVip}</TableCell>
                    <TableCell>{event.avaliableSeatsReguler}</TableCell>
                    <TableCell>Rp.{event.priceVvip},00</TableCell>
                    <TableCell>Rp.{event.priceVip},00</TableCell>
                    <TableCell>Rp.{event.priceReguler},00</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={handleUpdateEvent}
        />
      )} */}
    </div>
  );
}

export default RoleGuard(EventPage);
