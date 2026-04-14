import React from 'react';
import crystalsImage from 'figma:asset/822220297c90a7def771f4733533cac7dbd09d0e.png';

interface AIVideoBackgroundProps {
  className?: string;
}

const AIVideoBackground: React.FC<AIVideoBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
    </div>
  );
};

export default AIVideoBackground;