export interface SocialMedia {
  id: number;
  attributes: {
    iconsandlinks: [id: number, url: string];
  };
}
