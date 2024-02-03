import Map, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./pin";
import { useEffect, useRef, useState } from "react";
import { MapContentData } from "../../interfaces/returned-data/map-content";
import Link from "next/link";

const TOKEN = process.env.NEXT_PUBLIC_REACT_MAPBOX_TOKEN;

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5,
};

export default function MapComponent() {
  const mapRef = useRef<MapRef | null>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(4);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [markers, setMarkers] = useState<MapContentData[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const fetchData = async (): Promise<MapContentData[]> => {
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_BE_URL}/api/mapcontents?populate[mapdata][populate]=image`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = await response.json();

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

  return (
    <>
      {showMessage && (
        <div className="message absolute top-2/4 left-2/4 z-10 w-96 h-fit bg-background/75 rounded p-8 text-text">
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
            Fly
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
        {markers.flatMap((item) =>
          item.attributes.mapdata.map((data) => {
            const imageUrl = data.image.data[0].attributes.url;
            const longitude = Number(data.longitude);
            const latitude = Number(data.latitude);
            const description = data.description;
            const markerId = data.id; // Assuming `data.id` uniquely identifies each marker
            const alternativeText =
              data.image.data[0].attributes.alternativeText;

            return (
              <Marker
                key={markerId}
                longitude={longitude}
                latitude={latitude}
                onClick={() => togglePopup(markerId)}
              >
                <Pin />
                {selectedMarkerId === markerId && (
                  <Popup
                    latitude={latitude}
                    longitude={longitude}
                    anchor="bottom"
                    className="text-black"
                    onClose={() => setSelectedMarkerId(null)}
                    closeOnClick={false}
                  >
                    <h2 className="text-base">{description}</h2>
                    <img src={imageUrl} alt={alternativeText} />
                    <Link
                      href={"/gallery"}
                      className="text-primary text-sm hover:underline cursor-pointer"
                    >
                      Explore Our Gallery
                    </Link>
                  </Popup>
                )}
              </Marker>
            );
          })
        )}
      </Map>
    </>
  );
}
