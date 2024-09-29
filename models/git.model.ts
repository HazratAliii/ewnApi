import { Schema, model } from "mongoose";

const gitSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Git = model("Git", gitSchema);

export default Git;
