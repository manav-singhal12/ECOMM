"use client"
import React, { useState } from 'react';

const CircleComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active circle index

  // Initial colors of circles
  const initialColors = ['red', 'blue', 'green', 'yellow', 'purple'];

  // Handler to update active circle index
  const handleCircleClick = (index) => {
    setActiveIndex(index); // Set active index to the clicked circle
  };

  return (
    <div className="circle-container">
        Heello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit non consequatur mollitia alias odio magni labore enim obcaecati sapiente? Harum quasi itaque nisi impedit veniam sed necessitatibus architecto modi deleniti.
      {initialColors.map((color, index) => (
        <div 
          key={index}
          className="circle h-12 w-12"
          style={{ backgroundColor: activeIndex === index ? 'orange' : color }}
          onClick={() => handleCircleClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default CircleComponent;
