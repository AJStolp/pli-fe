import Map, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./pin";
import { useRef, useState } from "react";
import pindata from "./pin-data";

const TOKEN = process.env.NEXT_PUBLIC_REACT_MAPBOX_TOKEN;

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5,
};

export default function MapComponent() {
  const mapRef = useRef<MapRef | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(4);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [markers, setMarkers] = useState(pindata);

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
    console.log("Toggling Popup for Marker ID:", markerId);
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) => {
        const showPopup = marker.id === markerId ? !marker.showPopup : false;
        console.log(
          `Marker ${marker.id} - Show Popup: ${showPopup}`,
          "toggle popup"
        );
        return { ...marker, showPopup };
      })
    );
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const fullScreenImageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1050,
    background: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {showMessage && (
        <div className="message absolute top-2/4 left-2/4 z-10 w-96 h-fit bg-secondary/75 rounded p-8 text-accent">
          <h1> Take Flight Over the Midwest!</h1>
          <p>
            Zoom into our interactive map to explore the Upper Peninsula,
            Wisconsin, and beyond through stunning drone photography. Discover
            hidden gems and breathtaking landscapes with just a click - your
            aerial adventure starts here!
          </p>
          <button
            onClick={handleCtaClick}
            className="cta-button pt-8 hover:underline"
          >
            Zoom In
          </button>
        </div>
      )}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -108.5,
          latitude: 45.5,
          zoom: 3.5,
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
            onClick={() => togglePopup(marker.id)}
          >
            <Pin />
            {marker.showPopup && (
              <Popup
                latitude={marker.latitude}
                longitude={marker.longitude}
                anchor="bottom"
                className="text-black"
                closeOnClick={false}
              >
                {marker.description}
                <img src={marker.image} alt="" />
              </Popup>
            )}
          </Marker>
        ))}
      </Map>
    </>
  );
}
