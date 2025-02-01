import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

function CacheCard({ name, keyValue, showArrow }) {
  const displayName = name.length > 25 ? `${name.slice(0, 25)}...` : name;

  return (
    <div className="flex flex-col items-center">
      {showArrow && (
        <div className="flex">
          <FaLongArrowAltUp className="text-gray-600 text-xl my-4" />
          <FaLongArrowAltDown className="text-gray-600 text-xl my-4" />
        </div>
      )}

      <div
        className="bg-white shadow-md rounded-lg mx-11 px-11 py-4 w-2/3 border border-gray-200"
        title={name}
      >
        <h3 className="flex items-center justify-between text-lg font-semibold text-gray-800">
          {displayName}
          <span className="text-sm text-gray-600">
            Key:{" "}
            <span className="text-sm font-medium text-gray-800">
              {keyValue}
            </span>
          </span>
        </h3>
      </div>
    </div>
  );
}

export default CacheCard;
