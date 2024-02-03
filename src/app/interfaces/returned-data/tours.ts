export interface TourData {
  id: number;
  attributes: {
    linktext: [
      {
        id: number;
        linktext: string;
        linkpath: string;
      }
    ];
  };
}
