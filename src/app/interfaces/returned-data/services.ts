export interface ServicesData {
  id: number;
  attributes: {
    heading: string;
    intro: string;
    description: string;
    content: [
      {
        type: string;
        children: [
          {
            text: string;
            type: string;
          },
          {
            type: string;
            format: string;
            children: [
              {
                type: string;
                children: [
                  {
                    bold: true;
                    text: string;
                    type: string;
                  },
                  {
                    text: string;
                    type: string;
                  }
                ];
              }
            ];
          }
        ];
      }
    ];
  };
}
