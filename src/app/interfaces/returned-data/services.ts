export interface ServicesData {
  id: number;
  attributes: {
    intro: string;
    description: string;
    dronecontent: ContentNode[];
    matterportcontent: ContentNode[];
    heading: string;
    tab1icon: {
      data: {
        id: number;
        attributes: {
          alternativeText: string;
          url: string;
        };
      };
    };
    tab2icon: {
      data: {
        id: number;
        attributes: {
          alternativeText: string;
          url: string;
        };
      };
    };
  };
}

export interface ContentNode {
  type: string;
  image?: string;
  text?: string;
  children?: ContentNode[];
}

export interface RootNode {
  type: "root";
  children: ContentNode[] | string;
}
