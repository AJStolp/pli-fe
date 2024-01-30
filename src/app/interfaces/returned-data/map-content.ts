export interface MapContentData {
  id: number;
  attributes: {
    description: string;
    showPopup: boolean;
    latitude: number;
    longitude: number;
    image: {
      data: [
        { id: number; attributes: { alternativeText: string; url: string } }
      ];
    };
  };
}
