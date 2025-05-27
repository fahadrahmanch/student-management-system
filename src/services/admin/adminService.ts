import { IUser } from '../../interfaces/User'
import{IadminService} from './IadminService'
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
    async listStudents():Promise<IUser[]> {
        return this.adminRepository.listStudents()
    }

    async deleteStudent(id:string):Promise<IUser | null>{
        const student= await this.adminRepository.findById(id)
        console.log(student)
        if(!student){
            throw new Error("Student not found")
        }
        return this.adminRepository.deleteStudent(id)
    }
    async updateStudent(id: string, student: Partial<IUser>): Promise<Partial<IUser> | null> {
        const studentData=await this.adminRepository.findById(id)
        if(!studentData){
            throw new Error("student not exist")
        }
        const hashPassword =await this.bycrpt.hashPassword(studentData.password)
        student.password=hashPassword
        return this.adminRepository.updateStudent(id,student)
    }
  
}
