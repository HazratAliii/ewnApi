import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Up and Running" });
});

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
