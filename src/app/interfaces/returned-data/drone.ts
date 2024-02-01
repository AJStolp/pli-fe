export interface DroneData {
  id: number;
  attributes: {
    sections: [
      {
        id: number;
        title: string;
        media: [
          {
            id: number;
            media: {
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
      }
    ];
  };
}
