import { User } from "./user.ts";
import fileUpload from "express-fileupload";

declare global {
  namespace Express {
    export interface Request {
      user?: User | null;
      image?: {
        imageId: string;
        url: string;
      };
    }
  }
}