import { IUser } from '../../interfaces/User'
import{IadminService} from '../../services/admin/IadminService'
import{BcryptService} from '../../utils/bycrpt'
import{adminRepository} from '../../repositories/admin/adminRepository'
export class adminServices implements IadminService{
    constructor(private adminRepository:adminRepository,private bycrpt:BcryptService){
     this.adminRepository=adminRepository
    }
   async adminLogin(email: string, password: string): Promise<IUser> {
   
    
        const admin =await this.adminRepository.findByEmail(email)
        if(!admin){
            throw new Error("Admin account with this email does not exist.");
        }
        const matchPassword=await this.bycrpt.comparePassword(password,admin.password)
        if(!matchPassword){
            throw new Error("Invalid Password")
        }
        if(admin.role!='admin'){
            throw new Error("Access denied. You are not authorized as an admin.");
        }
        return admin

    }
    // async listStudents():Promise<IUser[]> {
    //     return this.adminRepository
    // }
     // updateStudent(id: string, student: IUser): Promise<Partial<IUser> | null> {
        
    // }
    // deleteStudent(id: string): Promise<IUser | null> {
        
    // }
    // listStudents(): Promise<IUser[]> {
        
    // }
}
