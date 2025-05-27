import{IadminRepository} from './InterfaceAdminRepository'
import{User} from '../../models/user'
import{IUser} from '../../interfaces/User'
export class adminRepository implements IadminRepository{
    constructor(){}

    async findByEmail(email:string):Promise<IUser|null>{
        return  User.findOne({email})
    }
    async listStudents():Promise<IUser[]>{
        return  User.find({role:"student"})
    }
   async deleteStudent(_id:string):Promise<IUser | null>{
    return  User.findByIdAndDelete(_id)
   }

   async findById(_id:string):Promise<IUser|null>{
    return  User.findOne({_id})
   }
   async updateStudent(_id:string,student:Partial<IUser>):Promise<IUser|null>{
    return  User.findByIdAndUpdate(_id, student, {new:true})
   }



}