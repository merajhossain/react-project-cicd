import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link to="/products" className={`flex items-center no-underline hover:opacity-80 transition-opacity ${className}`}>
      <span className="text-2xl font-black tracking-tighter text-black uppercase select-none">
        Roxon<span className="text-blue-600">.</span>
      </span>
    </Link>
  );
};

export default Logo;
