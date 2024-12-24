// src/Components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ symbol, number, text, color, onClick }) => {
  return (
    <div className="card" style={{ borderColor: color }} onClick={onClick}>
      <div className="card-symbol" style={{ color: color }}>
        {symbol}
      </div>
      <div className="card-number">{number}</div>
      <div className="card-text">{text}</div>
    </div>
  );
};

export default Card;
