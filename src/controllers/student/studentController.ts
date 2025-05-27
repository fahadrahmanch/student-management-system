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

      res.status(200).json({message:"student registration is success"})
    }
    catch(error){
        console.log(error)
        if(error instanceof Error){
          res.status(400).json({message:error.message  })
      }
    }
    }
    public async updateStudent(req:Request,res:Response):Promise<void>{
        try{
          const id=req.params.id
          const student:Partial<IUser>=req.body
          if(!id){
            res.status(400).json({ message: "Student ID is required" });
            return;
          }
          if(id!=req.session.user){
            throw new Error("Unauthorized access: User ID does not match.");
          }
          const studentUpdate= await this.StudentService.updateStudent(id,student)  
          res.status(200).json({ message: "Student updated successfully", data: studentUpdate });
        }
        catch(error){
            console.log(error)
            if(error instanceof Error){
              res.status(400).json({message:error.message  })
          }
        }
    }
    public async loginStudent(req:Request,res:Response):Promise<void>{
        try{
        const student:IUser=req.body
        const studentLogin=await this.StudentService.loginStudent(student.email,student.password)
        req.session.user=studentLogin?._id?.toString()
         res.status(200).json({message:"login successfully",studentLogin:studentLogin})
         return 

        }
        catch(error){
            console.log(error)
            if(error instanceof Error){
              res.status(400).json({message:error.message  })
          }
        }
    }
    async logout(req:Request,res:Response):Promise<void>{
      try{
        if(req.session.user){
           req.session.user=false
           res.status(200).json({ message: "user logged out" });
        }
      }catch(error){
        console.log(error)
      }
    }

}
