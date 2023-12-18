export interface HomeData {
  id: number;
  attributes: {
    title: string;
    hero: {
      id: number;
      heading: string;
      image: {
        data: {
          id: number;
          attributes: {
            alternativeText: string;
            url: string;
          };
        };
      };
    };
  };
}
