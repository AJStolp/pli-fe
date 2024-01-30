import Map, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./pin";
import { useEffect, useRef, useState } from "react";
import { getData } from "../../api/fetch";
import { MapContentData } from "../../interfaces/returned-data/map-content";
import { pinData } from "./pin-data";

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
  const [markers, setMarkers] = useState<MapContentData[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const fetchData = async (): Promise<MapContentData[]> => {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_BE_URL}/api/mapcontents?populate=*`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = await response.json();
    // Assuming the relevant data is nested inside a 'data' property
    console.log(markers, "markers");
    return jsonResponse.data;
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => {
        return error;
      });
  }, []);

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
    setSelectedMarkerId((prevSelectedMarkerId) =>
      prevSelectedMarkerId === markerId ? null : markerId
    );
  };

  // const togglePopup = (markerId: number) => {
  //   console.log("Toggling Popup for Marker ID:", markerId);
  //   setMarkers((prevMarkers) =>
  //     prevMarkers.map((marker) => {
  //       const showPopup = marker.id === markerId ? !marker.showPopup : false;
  //       console.log(
  //         `Marker ${marker.id} - Show Popup: ${showPopup}`,
  //         "toggle popup"
  //       );
  //       return { ...marker, showPopup };
  //     })
  //   );
  // };

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
            hidden gems and breathtaking landscapes with just a click. Your
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
            latitude={marker.attributes.latitude}
            longitude={marker.attributes.longitude}
            onClick={() => togglePopup(marker.id)}
          >
            <Pin />
            {selectedMarkerId === marker.id && (
              <Popup
                latitude={marker.attributes.latitude}
                longitude={marker.attributes.longitude}
                anchor="bottom"
                className="text-black"
                onClose={() => setSelectedMarkerId(null)}
                closeOnClick={false}
              >
                {marker.attributes.description}
                <img
                  src={marker.attributes.image.data[0].attributes.url}
                  alt=""
                />
              </Popup>
            )}
          </Marker>
        ))}
      </Map>
    </>
  );
}
