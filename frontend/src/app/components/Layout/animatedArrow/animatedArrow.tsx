import { useState } from 'react';
import './Arrow.css';

interface AnimatedArrowProps {
  isActive: boolean;
  onClick: () => void;
}

export default function AnimatedArrow({isActive, onClick} : {isActive:Boolean, onClick:Function}) {

  return (
    <div
      className={`arrow ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation(); // Zatrzymanie propagacji kliknięcia
        onClick();
      }}>
        <span className="arrow"></span><span></span></div>
  );
}