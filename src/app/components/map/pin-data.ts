interface PinDataProps {
  latitude: number;
  longitude: number;
  id: number;
  showPopup: boolean;
  image?: string;
  description?: string;
}

export const pinData: PinDataProps[] = [
  {
    latitude: 45.5,
    longitude: -88.5,
    id: 1,
    showPopup: false,
    description: "",
    image: "",
  },
  {
    latitude: 46.5201,
    longitude: -88.1946,
    id: 2,
    showPopup: true,
    description: "",
    image: "",
  },
];
