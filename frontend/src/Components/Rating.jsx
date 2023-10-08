// Rating.js
import React, { useState } from 'react';

function Rating({ initialValue, readOnly, onRatingChange }) {
  const [rating, setRating] = useState(initialValue);

  const handleClick = (newRating) => {
    if (!readOnly) {
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? 'filled' : ''}`}
          onClick={() => handleClick(value)}
          style={{ fontSize: '24px', cursor: readOnly ? 'auto' : 'pointer' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default Rating;

