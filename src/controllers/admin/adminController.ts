import express,{Request,Response} from 'express'
import{adminServices} from '../../services/admin/adminService'
import { IUser } from '../../interfaces/User';

export class adminController{
     constructor(private adminServices:adminServices){}
     async adminLogin(req:Request,res:Response):Promise<void>{
        try{
        const {email,password}=req.body
        const adminData=await this.adminServices.adminLogin(email,password)
        req.session.admin = {email}
        res.status(200).json({ message: "Admin login successful." ,adminData:adminData});
        }
        catch(error){
            console.log(error)
            if(error instanceof Error){
                res.status(400).json({message:error.message  })
            }
        }
       
    }
    async getStudents(req:Request,res:Response):Promise<void>{
        try{
            const studentLists= await this.adminServices.listStudents()
            res.status(200).json({message:"Student list fetched successfully",studentLists:studentLists})
        }
        catch(error){
            console.log(error)
            if(error instanceof Error){
                res.status(400).json({message:error.message  })
            }
        }
        
    }
    async deleteStudent(req:Request,res:Response):Promise<void>{
        try{
            const id=req.params.id
            if (!id) {
                 res.status(400).json({ message: "ID is required" });
                 return 
            }
           await  this.adminServices.deleteStudent(id)
        //   console.log(deleteStudent)
            res.status(200).json({message:"delete student succefully"})
        }
        catch(error){
           console.log(error)
           if(error instanceof Error){
            res.status(400).json({message:error.message  })
        }
        }
        
    }
    async updateStudent(req:Request,res:Response):Promise<void>{
        try{
            const _id=req.params.id
            if(!_id){
                throw new Error('"ID is required" ')
            }
            const student:Partial<IUser>=req.body
            const updateStudent=await this.adminServices.updateStudent(_id,student)
            res.status(200).json({ message: "Student updated successfully", data: updateStudent });
        }catch(error){
            console.log(error)
            if(error instanceof Error){
                res.status(400).json({message:error.message  })
            }
        }
    }
    async logout(req:Request,res:Response):Promise<void>{
        try{
           if(req.session.admin){
            req.session.admin=false
            res.status(200).json({ message: "Admin logged out" });
           }
        }catch(error){
            console.log(error)
        }
    }

}