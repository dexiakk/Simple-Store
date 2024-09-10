import { useState } from 'react';
import './Arrow.css';

interface AnimatedArrowProps {
  isActive: boolean;
  onClick: () => void;
}

export default function AnimatedArrow({isActive, onClick} : {isActive:Function, onClick:Function}) {

  return (
    <div
      className={`arrow ${isActive ? 'active' : ''}`}
      onClick={onClick}>
        <span className="arrow"></span><span></span></div>
  );
}