export interface HomeData {
  id: number;
  attributes: {
    title: string;
    hero: {
      id: number;
      heading: string;
      content: string;
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
