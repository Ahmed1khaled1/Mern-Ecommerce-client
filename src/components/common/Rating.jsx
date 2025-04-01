import React from "react";
import { StarIcon } from "lucide-react";

function Rating({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <button
      key={index}
      className={`rounded-full transition-colors cursor-pointer ${
        star <= rating
          ? "text-yellow-300 "
          : "text-black "
      }`}
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating
            ? "fill-yellow-300"
            : "fill-black "
        }`}
      />
    </button>
  ));
}

export default Rating;
