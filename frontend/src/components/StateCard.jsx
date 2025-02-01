import React from "react";

function StateCard({
  stateName,
  capital,
  description,
  imageUrl,
  population,
  famousFood,
  famousDance,
  famousPlaces,
  languagesSpoken,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-6">
      <img
        src={imageUrl}
        alt={`${stateName} State`}
        className="w-full h-80 object-cover"
      />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {stateName} (Capital: {capital})
        </h1>

        <p className="text-gray-600 text-base mb-4">
          <span className="font-semibold">Population:</span> {population}
        </p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Details
          </h2>
          <p className="text-gray-700 text-base">{description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Famous Food
          </h2>
          <p className="text-gray-700 text-base">{famousFood}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Famous Dance
          </h2>
          <p className="text-gray-700 text-base">{famousDance}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Famous Places to Visit
          </h2>
          <p className="text-gray-700 text-base">{famousPlaces}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Languages Spoken
          </h2>
          <p className="text-gray-700 text-base">{languagesSpoken}</p>
        </div>
      </div>
    </div>
  );
}

export default StateCard;