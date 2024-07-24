"use client"; 

import React, { useState } from 'react';

interface CardSliderProps {
  cards: { image: string; text1: string; text2: string }[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 3));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative overflow-hidden w-[1158px] h-[250px] mx-auto">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-cusBlue text-white px-4 py-2 rounded-full z-10"
        onClick={handlePrev}
        aria-label="Previous"
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-cusBlue text-white px-4 py-2 rounded-full z-10"
        onClick={handleNext}
        aria-label="Next"
      >
        &gt;
      </button>

      <div className="relative overflow-hidden w-[1158px]">
      <div
        className="flex transition-transform duration-300 ease-in-out gap-6"
        style={{
          transform: `translateX(-${currentIndex * (370 + 16)}px)`,
          width: `${cards.length * (370 + 16)}px`, 
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[365px] h-[250px] flex-shrink-0 p-4 bg-white border-2 border-cusBlue rounded-[10px] items-center justify-center text-center"
          >
            <img className="mx-auto w-[190px] h-[50px] object-cover mb-2" src={card.image} alt={`Card ${index}`} />
            <p className="mx-auto text-cusBlue text-2xl font-medium italic">{card.text1}</p>
            <p className="mx-auto px-5 text-black text-md font-light">{card.text2}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default CardSlider;

