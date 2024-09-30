import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(
  cors({
    origin: "https://ewnfe.vercel.app",
    credentials: true,
  })
);
app.use(
  session({
    secret: "sdlfksldfjlkjflsjdflksjad",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Use 'true' in production (requires HTTPS)
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Up and Running" });
});

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    if (process.env.NODE_ENV === "local") {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  })
  .catch((e) => {
    console.log(e);
  });

export default app;
