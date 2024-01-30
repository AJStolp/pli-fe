// import { useState } from "react";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { Suspense } from "react";
// import MapSkeleton from "../skeleton/map-skeleton";
// import "mapbox-gl/dist/mapbox-gl.css";
// import Pin from "./pin";
// import * as React from "react";
// import Map, { Marker, Popup } from "react-map-gl";

// const PlMap = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiYXN0b2xwIiwiYSI6ImNscWIwNmpobDB0d2gycWtmamk2aDJqdTYifQ.xeJDAkC5Omjj0NI92stA7A",
// });

// const TOKEN =
//   "pk.eyJ1IjoiYXN0b2xwIiwiYSI6ImNscWIwNmpobDB0d2gycWtmamk2aDJqdTYifQ.xeJDAkC5Omjj0NI92stA7A";

// export default function MappedNoPAckage() {
//   const [zoomLevel, setZoomLevel] = useState(3.5);
//   const [showMessage, setShowMessage] = useState(true);
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   const handleCtaClick = () => {
//     setZoomLevel(6);
//     setShowMessage(false);
//   };

//   return (
//     <>
//       {showMessage && (
//         <div className="message">
//           <p>Explore cool landmarks on this map!</p>
//           <button onClick={handleCtaClick} className="cta-button">
//             Zoom In
//           </button>
//         </div>
//       )}
//       <PlMap
//         style="mapbox://styles/astolp/clqb492vv000h01qhdx103ua6"
//         containerStyle={{
//           height: "100vh",
//           width: "100vw",
//         }}
//         center={[-88.5, 45.5]}
//         zoom={[zoomLevel]}
//         className="m-auto"
//       >
//         <Layer
//           type="symbol"
//           id="marker"
//           layout={{
//             "icon-image": "marker-15", // Use the "marker-15" built-in icon
//             "icon-size": 3.5, // Adjust the size if needed
//           }}
//         >
//           <Feature coordinates={[44.82, -88.653841]} />
//         </Layer>
//       </PlMap>
//     </>
//   );
// }
