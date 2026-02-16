export interface User {
  _id: string;
  name: string;
  email: string;
  image: { imageId: string; url: string };
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}
