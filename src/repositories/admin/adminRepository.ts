import{IadminRepository} from './InterfaceAdminRepository'
import{User} from '../../models/user'
import{IUser} from '../../interfaces/User'
export class adminRepository implements IadminRepository{
    constructor(){}

    async findByEmail(email:string):Promise<IUser|null>{
        return await User.findOne({email})
    }
    async listStudents():Promise<IUser[]>{
        return await User.find({role:"student"})
    }


}