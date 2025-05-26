import express,{Request,Response} from 'express'
import{adminController} from '../controllers/admin/adminController'
export class adminRouter{
    private router:express.Router;
    constructor(private adminController:adminController){
     this.adminController=adminController
     this.router=express.Router()
     this.initializeRoutes();
    }
    initializeRoutes(){
    this.router.post("/login",(req:Request,res:Response)=>{
        this.adminController.adminLogin(req,res)
    })
    this.router.get("/students",(req:Request,res:Response)=>{
        this.adminController.getStudents(req,res)
    })
    }
    public getRouter(): express.Router {
        return this.router;
    }
}