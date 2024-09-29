import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { CreateUserDto } from "../dtos/CreateUserDto";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { LoginUserDto } from "../dtos/LoginUserDto";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
) => {
  try {
    const { email, password, givenName, familyName, language } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      email,
      password: hashedPassword,
      givenName,
      familyName,
      language,
      verificationToken,
      tokenExpiration: Date.now() + 3600000,
    });

    await newUser.save();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the following link: 
      http://localhost:${process.env.PORT}/api/v1/auth/verify/${verificationToken}`,
    };
    await transporter.sendMail(mailOptions as any);

    return res.status(201).json({
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const signin = async (
  req: Request<{}, {}, LoginUserDto>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password as string,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 5 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
