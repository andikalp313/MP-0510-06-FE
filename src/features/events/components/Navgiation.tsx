"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaFilm,
  FaFutbol,
  FaHeartbeat,
  FaPalette,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navigation = ({
  onCity,
  onCategory,
}: {
  onCity: (search: string) => void;
  onCategory: (search: string) => void;
}) => {
  const categories = [
    { name: "All", icon: <FaHome /> },
    { name: "TECHNOLOGY", icon: <FaLaptopCode /> },
    { name: "BUSINESS", icon: <FaBriefcase /> },
    { name: "EDUCATION", icon: <FaGraduationCap /> },
    { name: "ENTERTAINMENT", icon: <FaFilm /> },
    { name: "SPORTS", icon: <FaFutbol /> },
    { name: "HEALTH", icon: <FaHeartbeat /> },
    { name: "ART", icon: <FaPalette /> },
  ];

  const cities = [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Yogyakarta",
    "Semarang",
    "Makassar",
    "Palembang",
    "Denpasar",
    "Balikpapan",
  ];

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCity(city);
  };

  const handleCategoryClick = (category: string) => {
    const selected = category === "All" ? "" : category;
    setSelectedCategory(selected);
    onCategory(category === "All" ? "" : category);
  };

  return (
    <div>
      {/* Dropdown Kota */}
      <div className="mx-auto my-4 w-[90%]">
        <label
          htmlFor="city-select"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select a City:
        </label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Kategori */}
      <div className="my-7 flex flex-wrap items-center justify-evenly gap-6 bg-white px-6 py-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex transform cursor-pointer flex-col items-center rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-black ${
              selectedCategory === category.name ? "bg-gray-200 text-black" : ""
            }`}
            aria-label={`Filter by ${category.name}`}
          >
            <div className="mb-1 text-2xl">{category.icon}</div>
            <span className="text-xs font-semibold">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
