"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface OurTeamMember {
  id: number;
  name: string;
  position: string;
  expertise: string;
  photoUrl: string;
}

export default function OurTeam() {
  const [team, setTeam] = useState<OurTeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=5",
        );

        // Di sini kita membuat dua anggota tim secara statis: CEO dan Co-Founder
        const staticMembers = [
          {
            id: 0,
            name: "Andika Luhur Pambudi",
            position: "Chief Executive Officer (CEO)",
            expertise: "Visionary in End-to-End Event Solutions",
            photoUrl: "/images/andika.webp",
          },
          {
            id: 1,
            name: "INAS",
            position: "Co-Founder",
            expertise:
              "Expert in Partnerships and Business Development for Events",
            photoUrl: "/images/jane-doe.webp",
          },
        ];

        // Data anggota tim yang diambil dari randomuser.me
        const randomMembers = response.data.results.map(
          (member: any, index: number) => ({
            id: index + 2, // Mulai dari id 2 karena kita sudah pakai id 0 & 1 untuk CEO & Co-Founder
            name: `${member.name.first} ${member.name.last}`,
            position:
              index === 0
                ? "Lead Event Coordinator"
                : index === 1
                  ? "Venue Logistics Architect"
                  : index === 2
                    ? "Catering & Hospitality Manager"
                    : index === 3
                      ? "Marketing & Promotions Strategist"
                      : "Entertainment & AV Specialist",
            expertise:
              index === 0
                ? "Specialist in planning, scheduling, and on-site coordination."
                : index === 1
                  ? "Focuses on venue layout, logistics, and vendor collaboration."
                  : index === 2
                    ? "Ensures top-notch catering, hospitality, and guest experience."
                    : index === 3
                      ? "Creates impactful marketing strategies and promotional campaigns."
                      : "Manages live entertainment, audio-visual setups, and immersive experiences.",
            photoUrl: member.picture.large,
          }),
        );

        // Gabungkan data statis (CEO & Co-Founder) dengan data random
        const teamMembers = [...staticMembers, ...randomMembers];
        setTeam(teamMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeam();
  }, []);

  // Animasi dengan framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      id="ourteam"
      className="flex min-h-screen flex-col items-center bg-white p-10 text-gray-100"
    >
      {/* Header Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-10 text-center"
      >
        <h1 className="font-plusJakartaSans text-4xl font-bold leading-snug text-zinc-500 md:text-6xl">
          Welcome to <span className="text-slate-950"> Explore</span>
          <span className="text-sky-600">TiK</span> Team
        </h1>
        <p className="font-plusJakartaSans mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
          Elevating Your Events with Next-Level Management Solutions
        </p>
      </motion.div>

      {/* CEO & Co-Founder Section */}
      <div className="mb-20 flex w-full max-w-5xl flex-col gap-10">
        {team
          .filter((member) => member.id === 0 || member.id === 1)
          .map((founder) => (
            <motion.div
              key={founder.id}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex w-full transform flex-col items-center rounded-lg border border-cyan-600 bg-gray-800 p-12 text-center shadow-xl transition duration-500 hover:scale-105"
            >
              <img
                src={founder.photoUrl}
                alt={founder.name}
                className="mx-auto mb-6 h-48 w-48 rounded-full border-4 border-cyan-500 shadow-lg"
              />
              <h2 className="text-3xl font-bold text-white">{founder.name}</h2>
              <p className="mb-2 text-xl text-cyan-400">{founder.position}</p>
              <p className="mx-auto mb-4 max-w-xl text-gray-300">
                {founder.expertise}
              </p>
              <p className="mx-auto max-w-xl text-gray-400">
                {founder.id === 0
                  ? "Known for pioneering innovative solutions that elevate event experiences, Andika ensures our team is always at the forefront of event management technology."
                  : "Co-founder and strategic partner in business development, ensuring our event management solutions reach diverse markets and venues."}
              </p>
            </motion.div>
          ))}
      </div>

      {/* Team Members Section (Random Generated) */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-12 lg:grid-cols-3">
        {team
          .filter((member) => member.id >= 2)
          .map((member) => (
            <motion.div
              key={member.id}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="transform rounded-lg border border-gray-700 bg-gray-800 p-8 text-center shadow-lg transition duration-500 hover:scale-105"
            >
              <img
                src={member.photoUrl}
                alt={member.name}
                className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-cyan-500 shadow-lg"
              />
              <h2 className="text-xl font-semibold text-white">
                {member.name}
              </h2>
              <p className="mb-2 text-lg text-cyan-300">{member.position}</p>
              <p className="mb-2 text-gray-300">{member.expertise}</p>
              <p className="text-sm text-gray-400">
                With years of experience, {member.name.split(" ")[0]} brings
                unique expertise to drive innovation in{" "}
                {member.position.toLowerCase()}, focusing on delivering
                memorable and seamless event experiences.
              </p>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
