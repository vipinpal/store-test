import React, { memo, ReactNode } from 'react';
import './card.css';

interface CardProps {
    children: ReactNode;
  }

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className='card'>
            {children}
        </div>
    );
};

export default memo(Card);