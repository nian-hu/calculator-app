import React from 'react';
import './Button.css';

interface Props {
  value: string;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<Props> = ({ value, onClick, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {value}
    </button>
  );
};