"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (typeof window !== "undefined") {
      const email = "andikaluhurpambudi@gmail.com";
      const subject = `Pesan dari ${name}`;
      const body = `Halo, nama saya ${name}. ${message}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  const sendWhatsApp = () => {
    if (typeof window !== "undefined") {
      const phone = "+6282178342897";
      const text = `Halo, nama saya ${name}. ${message}`;
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank",
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative h-screen bg-white py-2 text-white"
    >
      {/* Particles Effect */}
      <Particles
        options={{
          // Ubah background menjadi transparent
          background: { color: { value: "transparent" } },
          particles: {
            color: { value: "#00FFFF" },
            links: { enable: true, color: "#00FFFF", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 50 },
            size: { value: 3 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 text-center"
        >
          <h1 className="font-plusJakartaSans text-4xl font-bold leading-snug text-sky-500 md:mt-20 md:text-6xl">
            Get in Touch
          </h1>
          <p className="font-plusJakartaSans mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-400 md:mb-20 md:text-xl">
            We'd love to hear from you! Feel free to reach out via email or
            WhatsApp.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            className="space-y-6 text-gray-800"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-sky-500 transition duration-300 hover:text-yellow-500">
              Contact Information
            </h2>
            <p className="text-gray-500">
              <FaMapMarkerAlt className="mr-2 inline-block text-sky-500" />
              Weru, Sukoharjo, Jawa Tengah, Indonesia
            </p>
            <p className="text-gray-500">
              <FaPhoneAlt className="mr-2 inline-block text-sky-500" />
              +62 8217 8342 897
            </p>
            <p className="text-gray-500">
              <FaEnvelope className="mr-2 inline-block text-sky-500" />
              <a
                href="mailto:andikaluhurpambudi@gmail.com"
                className="hover:underline"
              >
                andikaluhurpambudi@gmail.com
              </a>
            </p>
            <p className="text-gray-500">
              <FaGlobe className="mr-2 inline-block text-sky-500" />
              <a href="http://www.andikalp.com" className="hover:underline">
                www.andikalp.com
              </a>
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md bg-gray-200 p-3 text-gray-600 placeholder-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-32 w-full rounded-md bg-gray-200 p-3 text-gray-600 placeholder-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
            <div className="flex space-x-4">
              <motion.button
                onClick={sendEmail}
                whileHover={{ scale: 1.05 }}
                className="flex w-full items-center justify-center rounded-md bg-sky-500 p-3 text-white transition hover:bg-sky-600"
              >
                <FaEnvelope className="mr-2" />
                Send Email
              </motion.button>
              <motion.button
                onClick={sendWhatsApp}
                whileHover={{ scale: 1.05 }}
                className="flex w-full items-center justify-center rounded-md bg-green-500 p-3 text-white transition hover:bg-green-600"
              >
                <FaWhatsapp className="mr-2" />
                Send WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
