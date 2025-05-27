import express,{Request,Response} from 'express'
import {studentController} from '../controllers/student/studentController'
import{userAuth} from '../middlewares/auth'
export class StudentRouter{
    private StudentController:studentController
    private router:express.Router;
    constructor(StudentController: studentController){
        this.StudentController=StudentController
        this.router=express.Router()  
        this.initializeRoutes();
    }
    initializeRoutes(){
    this.router.post('/register',(req:Request,res:Response)=>{
      this.StudentController.createStudent(req,res)
    })

    this.router.post('/update/:id',userAuth,(req:Request,res:Response)=>{
        this.StudentController.updateStudent(req,res)
    })
    this.router.post('/login',(req:Request,res:Response)=>{
        this.StudentController.loginStudent(req,res)
    })
    this.router.get("/logout",(req:Request,res:Response)=>{
        this.StudentController.logout(req,res)
    })
}
    public getRouter(): express.Router {
        return this.router;
    }

}