import {User} from '../../models/user'
import { Request, Response } from "express";
import{IUser} from '../../interfaces/User'
import {studentService} from '../../services/student/studentService'
export class studentController{
    private StudentService:studentService
    constructor(StudentService:studentService){
        this.StudentService = StudentService;  
      }

    public async createStudent(req:Request,res:Response):Promise<void>{
    try{
     const student:IUser=req.body
     const createNewstudent= await this.StudentService.createStudent(student);
     console.log(createNewstudent)
     if(typeof createNewstudent==='string'){
        res.status(400).json({message:createNewstudent})
        return
     }
      res.status(200).json({message:"student registration is success"})
    }
    catch(error){
        console.log(error)
    }
    }
    public async updateStudent(req:Request,res:Response):Promise<void>{
        try{
          const student:IUser=req.body
          if(!student._id){
            res.status(400).json({ message: "Student ID is required" });
            return;
          }
          const studentUpdate= await this.StudentService.updateStudent(student._id,student)
        
          if(!studentUpdate){
            res.status(404).json({ message: "Student not found" });
          }else{
            res.status(200).json({ message: "Student updated successfully", data: studentUpdate });
          }
        }
        catch(error){
            console.log(error)
        }
    }
    public async loginStudent(req:Request,res:Response):Promise<void>{
        try{
        const student:IUser=req.body
        const studentLogin=await this.StudentService.loginStudent(student.email,student.password)
        if(!student){
            res.json({message:"Invalid input"})
            return 
        }
         res.status(200).json({message:"login successfully",studentLogin:studentLogin})
         return 

        }
        catch(error){
            console.log(error)
        }
    }

}
