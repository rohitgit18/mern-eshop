import express from "express";
import { signUp, signIn } from "../controller/user.controller.js";
import { body } from "express-validator";
import multer from "multer";
const upload = multer({dest: 'public/images'});
const router = express.Router(); //instance of router class

router.post("/signup",upload.single("profile"), body("email","Invalid email id").isEmail(),
body("email", "Email can not empty").notEmpty(),
body("password","Password is must").notEmpty(),
body("contact", "Contact number is required.").notEmpty(),
body("contact", "Only digits are allowed.").isNumeric(),signUp);

router.post("/signin",signIn);
export default router;