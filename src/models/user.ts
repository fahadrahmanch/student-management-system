import mongoose, { Schema } from "mongoose";
import{IUser} from '../interfaces/User'
const userSchema:mongoose.Schema= new Schema<IUser>({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   course:{
    type:String,
    required:false
   },
   password:{
      type:String,
      required:true
   },
   role:{
      type:String,
      enum:['student','admin'],
      default:"student"
   }

   
})
export const User=mongoose.model('user',userSchema)
