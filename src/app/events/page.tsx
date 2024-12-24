import Footer from "@/components/Footer";
import EventListPage from "@/features/events";
import React from "react";

const Event = () => {
  return (
    <main>
      <div>
        <EventListPage />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Event;
