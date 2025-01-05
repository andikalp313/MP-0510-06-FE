"use client";
import React from "react";
import Carousel from "../components/Carousal"; // Pastikan nama ini sesuai
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Jumbotron = () => {
  const images = [
    { src: "/ai2.webp", alt: "Slide 1" },
    { src: "/ai.webp", alt: "Slide 2" },
    { src: "/ai3.webp", alt: "Slide 3" },
  ];

  return (
    <div className="relative flex items-center justify-center bg-[#f0f9ff]">
      <Carousel images={images} />
    </div>
  );
};

export default Jumbotron;
