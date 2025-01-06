"use client";
import React from "react";
import { JourneyComponent } from "./components/Journey";
import OurTeam from "./components/OurTeam";
import { Contact } from "lucide-react";
import ContactForm from "./components/Contact";

const AboutPage = () => {
  return (
    <div>
      <JourneyComponent />;
      <OurTeam />
      <ContactForm />
    </div>
  );
};

export default AboutPage;
