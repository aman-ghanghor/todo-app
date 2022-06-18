import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/userModel.js";

class UserController {
  // registration
  static userRegistration = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email Already Exists!" });
    } else {
      if (name && email && password) {
        // Authentication Start
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email }, {password: 0});
          // Generate JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          // send token to client with response
          res.status(201).send({
            status: "success",
            message: "Registration Successful!",
            data: saved_user,
            token: token,
          });
        }
        catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register user!" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // login
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await UserModel.findOne({ email: email });
        console.log(user);
        if (user !== null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (email === user.email && isMatched) {
            // Regenerate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            const loggedUser = await UserModel.findOne({email: email}, {password: 0}) ;
            res.send({
              status: "success",
              message: "Login Succesfully",
              data: loggedUser,
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "email or password incorrect",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "email or password incorrect",
          });
        }
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "something went wrong" });
      }
    } else {
      res.send({ status: "failed", message: "All fields required" });
    }
  };

   static getUser = (req, res) => {
      if(req.user) {
         res.send({ status: "success", data: req.user, message: "fetched user successfully" });
      }
      else {
         res.send({ status: "failed", message: "unable to fetch user" });
      }
   }


}

export default UserController;
