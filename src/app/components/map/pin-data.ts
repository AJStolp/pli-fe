import { getData } from "../../api/fetch";
import { MapContentData } from "../../interfaces/returned-data/map-content";

// Define an interface for the object structure
interface PinData {
  latitude: number;
  longitude: number;
  id: number;
  description: string;
  showPopup: boolean;
  image: string;
}

// Adjusted based on your MapContentData interface
async function populatePinData<MapContentData>() {
  const endpoint = "/api/mapcontents?populate=*";
  const getPinData = await getData(endpoint);

  console.log(getPinData, "getpindatatatat");

  const pinData: PinData[] = [
    {
      latitude: 45.5,
      longitude: -88.5,
      id: 1,
      description: "First Pop Up",
      showPopup: false,
      image: "",
    },
    {
      latitude: 46.5201,
      longitude: -88.1946,
      id: 2,
      description: "Second Pop Up",
      showPopup: true,
      image: "",
    },
  ];
}

export default populatePinData;
