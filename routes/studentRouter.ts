import express,{Request,Response} from 'express'
import {studentController} from '../controllers/student/studentController'
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

    this.router.post('/update',(req:Request,res:Response)=>{
        this.StudentController.updateStudent(req,res)
    })
    this.router.post('/login',(req:Request,res:Response)=>{
        this.StudentController.loginStudent(req,res)
    })
}
    public getRouter(): express.Router {
        return this.router;
    }

}