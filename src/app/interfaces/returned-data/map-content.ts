export interface MapContentData {
  id: number;
  attributes: {
    mapdata: [
      {
        id: number;
        latitude: number;
        longitude: number;
        description: string;
        image: {
          data: [
            {
              id: number;
              attributes: {
                alternativeText: string;
                url: string;
              };
            }
          ];
        };
      }
    ];
  };
}
