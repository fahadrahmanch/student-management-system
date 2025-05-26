import express,{Request,Response} from 'express'
import{adminServices} from '../../services/admin/adminService'

export class adminController{
     constructor(private adminServices:adminServices){}
     async adminLogin(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body
        const adminData=await this.adminServices.adminLogin(email,password)
        res.status(200).json({ message: "Admin login successful." ,adminData:adminData});
    }
    async getStudents(req:Request,res:Response):Promise<void>{
        const studentLists= this.adminServices.listStudents()
        res.status(200).json({message:"fs",studentLists:studentLists})
    }

}