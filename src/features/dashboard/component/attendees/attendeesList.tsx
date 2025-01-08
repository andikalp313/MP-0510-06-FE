"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoleGuard from "@/hoc/roleGuard";

 function AttendeesPage() {
  const [attendees, setAttendees] = useState([
    {
      id: 1,
      name: "John Doe",
      event: "Summer Music Festival",
      tickets: 2,
      totalPaid: 100,
    },
    {
      id: 2,
      name: "Jane Smith",
      event: "Tech Conference 2023",
      tickets: 1,
      totalPaid: 100,
    },
    {
      id: 3,
      name: "Bob Johnson",
      event: "Food & Wine Expo",
      tickets: 3,
      totalPaid: 75,
    },
  ]);

  return (
    <div className="flex h-full w-full flex-col p-4">
      {" "}
      <Card className="w-full">
        {" "}
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
          <CardDescription>View all attendees for your events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Total Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.event}</TableCell>
                  <TableCell>{attendee.tickets}</TableCell>
                  <TableCell>${attendee.totalPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default RoleGuard (AttendeesPage)