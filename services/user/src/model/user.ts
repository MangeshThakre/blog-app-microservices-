import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: { imageId: string; url: string };
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

const schema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: Object },
    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    bio: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", schema);

export default User;