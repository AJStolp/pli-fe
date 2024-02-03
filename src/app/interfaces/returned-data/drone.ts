interface MediaAttributes {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
  };
}

interface Media {
  id: number;
  media: {
    data: MediaAttributes[];
  };
}

interface Section {
  id: number;
  title: string;
  media: Media[];
}

export interface DroneData {
  id: number;
  attributes: {
    sections: Section[];
  };
}
