import Map, { Marker, Popup, MapboxMap, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./pin";
import { useEffect, useRef, useState } from "react";

const TOKEN = process.env.NEXT_PUBLIC_REACT_MAPBOX_TOKEN;

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5,
};

export default function MapComponent() {
  const [zoomLevel, setZoomLevel] = useState(4);
  const [showMessage, setShowMessage] = useState(true);
  const [markers, setMarkers] = useState([
    {
      latitude: 45.5,
      longitude: -88.5,
      id: 1,
      description: "First Pop Up",
      showPopup: false,
    },
    {
      latitude: 46.5201,
      longitude: -88.1946,
      id: 2,
      description: "Second Pop Up",
      showPopup: true,
    },
  ]);

  const mapRef = useRef<MapRef | null>(null);

  const handleCtaClick = () => {
    setZoomLevel(6);
    setShowMessage(false);

    if (mapRef.current) {
      // Smooth zoom transition with optional center
      mapRef.current.flyTo({
        center: [-88.5, 45.5], // Adjust center as needed
        zoom: 6,
        speed: 0.5, // Customize animation speed (0-1)
      });
    }
  };

  const togglePopup = (markerId: number) => {
    console.log(`Popup opened for marker ID ${markerId}`);
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId
          ? { ...marker, showPopup: !marker.showPopup }
          : { ...marker, showPopup: false }
      )
    );
  };

  useEffect(() => {
    mapRef?.current?.on("click", () => {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) => ({ ...marker, showPopup: true }))
      );
    });
  }, [mapRef]);

  useEffect(() => {
    // Close all popups when the showPopup state changes for any marker
    const shouldCloseAllPopups = markers.some((marker) => marker.showPopup);
    if (shouldCloseAllPopups) {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) => ({ ...marker, showPopup: false }))
      );
    }
  }, [markers]);

  return (
    <>
      {showMessage && (
        <div className="message">
          <p>Explore cool landmarks on this map!</p>
          <button onClick={handleCtaClick} className="cta-button">
            Zoom In
          </button>
        </div>
      )}
      <Map
        mapLib={import("mapbox-gl" as any)}
        ref={mapRef}
        initialViewState={{
          longitude: -88.5,
          latitude: 45.5,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/astolp/clqb492vv000h01qhdx103ua6"
        mapboxAccessToken={TOKEN}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => {
              togglePopup(marker.id);
            }}
          >
            <Pin />
            {marker.showPopup && (
              <Popup
                latitude={marker.latitude}
                longitude={marker.longitude}
                anchor="bottom"
                onClose={() => togglePopup(marker.id)}
                className="text-black"
              >
                {marker.description}
              </Popup>
            )}
          </Marker>
        ))}
      </Map>
    </>
  );
}