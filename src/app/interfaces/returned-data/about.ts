export interface AboutData {
  id: number;
  attributes: {
    title: string;
    content: ContentNode[];
    email: string;
  };
}

export interface ContentNode {
  children?: ContentNode[];
}

export interface RootNode {
  type: "root";
  children: ContentNode[] | string;
}
