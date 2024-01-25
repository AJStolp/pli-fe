export interface ServicesData {
  id: number;
  attributes: {
    intro: string;
    description: string;
    dronecontent: ContentNode[];
    heading: string;
  };
}

export interface ContentNode {
  type: string;
  text?: string;
  children?: ContentNode[] | string;
}

export interface RootNode {
  type: "root";
  children: ContentNode[];
}
