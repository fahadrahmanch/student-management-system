import express, {Application}from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db'
import {StudentRouter} from './routes/studentRouter'
import {studentController} from './controllers/student/studentController'
import{studentService} from './services/student/studentService'
import{adminServices} from './services/admin/adminService'
import{studentRepository} from './repositories/student/studentRepository'
import{adminRepository} from './repositories/admin/adminRepository'
import{BcryptService} from './utils/bycrpt'
import { adminController } from './controllers/admin/adminController'
import{adminRouter} from './routes/adminRouter'
export class app{
    private app :Application;
    constructor(){
        this.app=express()
        this.setMiddlewares()
        this.setUserRouter()
        this.adminRouter()
    }
    public setMiddlewares(){
        console.log("setMiddlewares")
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
    }
    public async loadDatabase():Promise<void>{
        const db=new connectDB()
        await db.connect()
    }
    public async listen(){
       await  this.loadDatabase()
        this.app.listen(3000,()=>{
            console.log("server is running")
        })
    }
    private injectStudent(){
        const bycrpt=new BcryptService()
        const StudentRepository=new studentRepository()
        const StudentService=new studentService(StudentRepository,bycrpt)
        const student=new studentController(StudentService)
        // const studentService=new studentService()
        return student
    }

    async setUserRouter():Promise<void>{
        const injectStudentController=this.injectStudent()
        const studentRouter=new StudentRouter(injectStudentController)
        this.app.use('/student', studentRouter.getRouter())
    }
    private injectAdmin(){

        const bycrpt=new BcryptService()
        const AdminRepository=new adminRepository()
        const AdminServices=new adminServices(AdminRepository,bycrpt)

        const AdminController=new adminController(AdminServices)
        return AdminController

    }
    async adminRouter():Promise<void>{
        const injectAdmin =await this.injectAdmin()
        const AdminRouter=new adminRouter(injectAdmin)
       this.app.use('/admin',AdminRouter.getRouter())
    }
}
let App:app=new app()
App.listen()










