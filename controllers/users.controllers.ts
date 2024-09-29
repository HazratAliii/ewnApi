import { Request, Response } from "express";
import User from "../models/user.model";

export const userProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById({ _id: req.user.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(201).json({ user });
    console.log(user);
    // return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
