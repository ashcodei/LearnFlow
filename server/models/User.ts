import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "educator";
  googleId?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, required: true, enum: ["student", "educator"] },
  googleId: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
