// components/Carousel.tsx
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
  autoPlay?: boolean;
  autoPlayTime?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayTime = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayTime);
      return () => clearInterval(interval);
    }
  }, [current, autoPlay, autoPlayTime]);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className="relative h-64 w-[90%] overflow-hidden rounded-3xl md:h-[700px]">
      {/* Slide */}
      {images.map((image, index) => (
        <div
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          key={index}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Navigasi Panah Kiri */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white hover:bg-opacity-75"
        onClick={prevSlide}
      >
        <FaArrowLeft />
      </button>

      {/* Navigasi Panah Kanan */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white hover:bg-opacity-75"
        onClick={nextSlide}
      >
        <FaArrowRight />
      </button>

      {/* Indikator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            } cursor-pointer`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
