/*
    Mongoose Model define the structure of Data and will turn into 
    model class and it will also provide the interface to interact 
    with Database.
    User.find()  => to search document in database
    User.create()  => to create new document in database
    User.update()  => to update document in database


*/
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    contact:{
        type: Number,
        required: true,
    }
},{versionKey: false});
export const User = mongoose.model("user", userSchema);