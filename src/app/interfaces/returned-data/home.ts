export interface HomeData {
  id: number;
  attributes: {
    title: string;
    ServicesOverview: string;
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
    threeColumnP: {
      topP: string;
      col1: string;
      col2: string;
      col3: string;
      bottomP: string;
      col3icon: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      col2icon: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      col1icon: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  };
}
