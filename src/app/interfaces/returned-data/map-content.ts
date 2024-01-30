export interface MapContentData {
  id: number;
  attributes: {
    description: string;
    image: {
      data: [
        { id: number; attributes: { alternativeText: string; url: string } }
      ];
    };
  };
}
