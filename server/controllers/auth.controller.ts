import { Request, Response, RequestHandler, NextFunction } from "express";
import { passport } from "../config/passport";

type User = {
  user_id: string;
  email: string;
};

type AuthError = {
  message: string;
};

const loginAdmin: RequestHandler = async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful",
         username: user.username, userId: user.user_id 
      });
    });
  })(req, res, next);
};


const signUpAdmin: RequestHandler = (req, res, next) => {
  console.log(req.body);  // Log the request body to debug

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  passport.authenticate("signup-admin", (err, user, info) => {
    if (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Server error during signup" });
    }
    if (!user) {
      return res.status(400).json({ message: info?.message || "Signup failed" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error after signup:", err);
        return res.status(500).json({ message: "Server error during login" });
      }

      return res.status(201).json({
        message: "Admin registered and logged in successfully",
        username: user.username,
        userId: user.user_id,
      });
    });
  })(req, res, next);
};


const logOutAdmin: RequestHandler = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Server error during logout" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Server error during logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

export default { loginAdmin, logOutAdmin, signUpAdmin };
