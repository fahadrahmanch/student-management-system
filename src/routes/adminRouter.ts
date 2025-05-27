import express,{Request,Response} from 'express'
import{adminController} from '../controllers/admin/adminController'
import{adminAuth} from '../middlewares/auth'
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
    this.router.get("/students",adminAuth,(req:Request,res:Response)=>{
        this.adminController.getStudents(req,res)
    })
    this.router.post('/delete/:id',adminAuth,(req:Request,res:Response)=>{
        this.adminController.deleteStudent(req,res)
    })
    this.router.post('/update/:id',adminAuth,(req:Request,res:Response)=>{
        this.adminController.updateStudent(req,res)
    })

    this.router.get('/logout',(req:Request,res:Response)=>{
        this.adminController.logout(req,res)
    })
    }
    public getRouter(): express.Router {
        return this.router;
    }
}