import Footer from "@/components/Footer";
import EventList from "@/features/events";
import React from "react";

const Event = () => {
  return (
    <main>
      <div>
        <EventList />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Event;
