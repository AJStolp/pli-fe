interface Icon {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
  };
}

interface IconsAndLinks {
  id: number;
  url: string;
  icon: {
    data: Icon[];
  };
}

interface SocialMediaAttributes {
  iconsandlinks: IconsAndLinks[];
}

export interface SocialMedia {
  id: number;
  attributes: SocialMediaAttributes;
}
