import './Arrow.css';

interface AnimatedArrowProps {
  isActive: boolean;
}

export default function AnimatedArrow({ isActive }: AnimatedArrowProps) {
  return (
    <div className={`arrow ${isActive ? 'active' : ''}`}>
      <span className="arrow"></span>
      <span></span>
    </div>
  );
}