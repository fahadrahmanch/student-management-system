import{IstudentRepository} from './InterfaceStudentRepository'
import{User} from '../../models/user'
import{IUser} from '../../interfaces/User'

export class studentRepository implements IstudentRepository{
    constructor(){

    }
    async createStudent(student:IUser):Promise<any>{
        return  User.create(student) 
    }
   async findByEmail(email:string):Promise<IUser|null>{
     return   User.findOne({email})
   }
   async findById(_id:string):Promise<IUser|null>{
    return  User.findById(_id)
   }

   async updateStudent(_id:string,student:Partial<IUser>):Promise<IUser|null>{
    
    return  User.findByIdAndUpdate(_id, student, {new:true})
   }

}
