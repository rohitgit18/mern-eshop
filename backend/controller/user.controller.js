import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
const config = dotenv.config();
export const signIn = async (request,response,next)=>{
   let {email,password} = request.body;
   try{
      let user = await User.findOne({email});
      if(user){
        let status = await bcrypt.compare(password,user.password);
        const token = generateToken(user._id);
        console.log(token);
        user.password = undefined;
        return status ? response.status(200).json({message: 'Signed in Successfully.', user, token}) : response.status(401).json({error: "Bad request | Unauthorized user"});
      }  
      return response.status(401).json({error: "Bad request|Unauthroized user"});
   }
   catch(err){
    return response.status(500).json({error: "Internal Server Error"});
   } 
}
const generateToken = (userId)=>{
  let payload = {subject: userId};
  console.log(process.env.SECRET_KEY);
  let token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
}
export const signUp = async (request,response,next)=>{
  try{   
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(401).json({error: "Bad request",errors: errors.array()});
     let profile = "";
     if(request.file)
      profile = "images/"+request.file.filename;
    let {email,password,contact} = request.body;
    let user = await User.create({email,password,contact,profile});  
    return response.status(201).json({message: "User Signed Up Successfully | User saved",user});
  }
  catch(err){
    return response.status(500).json({error: "Internal Server Error"});
  }
}