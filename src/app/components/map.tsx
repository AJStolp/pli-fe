import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Suspense } from "react";
import MapSkeleton from "./skeleton/map-skeleton";

const PlMap = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYXN0b2xwIiwiYSI6ImNscWIwNmpobDB0d2gycWtmamk2aDJqdTYifQ.xeJDAkC5Omjj0NI92stA7A",
});

const landmarksData = [
  {
    id: "landmark1",
    name: "Iron Mountain, MI",
    coordinates: [-88.0598, 45.8174], // Iron Mountain, MI coordinates
    image: "iron-mountain.jpg", // Image URL for Iron Mountain, MI
    description:
      "Iron Mountain is a charming city in Michigan known for its scenic beauty and outdoor activities.", // Description
  },
  // Add more landmarks as needed
];

function LandmarkPopup({ landmark }) {
  return (
    <Popup coordinates={landmark.coordinates} offset={[0, -50]}>
      <div className="landmark-popup">
        <h2>{landmark.name}</h2>
        <img src={landmark.image} alt={landmark.name} />
        <p>{landmark.description}</p>
      </div>
    </Popup>
  );
}

export default function Mapped() {
  const [zoomLevel, setZoomLevel] = useState(3.5);
  const [showMessage, setShowMessage] = useState(true);
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  const handleLandmarkClick = (landmark) => {
    setSelectedLandmark(landmark);
  };

  return (
    <>
      {showMessage && (
        <div className="message">
          <p>Explore cool landmarks on this map!</p>
          <button onClick={() => setZoomLevel(6)} className="cta-button">
            Zoom In
          </button>
        </div>
      )}
      {selectedLandmark && (
        <div className="popup-container">
          <LandmarkPopup landmark={selectedLandmark} />
          <button onClick={() => setSelectedLandmark(null)}>Close</button>
        </div>
      )}
      <Suspense fallback={<MapSkeleton />}>
        <PlMap
          style="mapbox://styles/astolp/clqb492vv000h01qhdx103ua6"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[-88.5, 45.5]}
          zoom={[zoomLevel]}
          className="m-auto"
        >
          {landmarksData.map((landmark) => (
            <Marker
              key={landmark.id}
              coordinates={landmark.coordinates}
              anchor="bottom"
              onClick={() => handleLandmarkClick(landmark)}
            >
              <img src="public/land-marker.png" alt="Landmark Marker" />
              <img
                src="src/app/assets/land-marker.png"
                alt="Landmark Marker not public"
              />
            </Marker>
          ))}
        </PlMap>
      </Suspense>
    </>
  );
}
