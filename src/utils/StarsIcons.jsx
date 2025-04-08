import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarsIcons({ value }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-accent" size={16} />
      ))}
      {hasHalfStar && (
        <FaStar
          key="half"
          className="text-accent"
          size={16}
          style={{
            clipPath: "inset(0 50% 0 0)",
            display: "inline-block",
          }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300" size={16} />
      ))}
    </div>
  );
}
