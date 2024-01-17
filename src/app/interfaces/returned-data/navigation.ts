export interface NavData {
  id: number;
  attributes: {
    linktext: [
      {
        id: number;
        linktext: string;
        linkpath: string;
      }
    ];
    logo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
