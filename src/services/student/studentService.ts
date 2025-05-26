import{IstudentService} from './IstudentService'
import { IUser } from '../../interfaces/User';
import{studentRepository} from '../../repositories/student/studentRepository'
import { User } from '../../models/user';  
import{BcryptService} from '../../utils/bycrpt'

export class studentService implements IstudentService{ 
    constructor(private StudentRepository:studentRepository,private bycrpt:BcryptService){
     this.StudentRepository=StudentRepository
    }

    // create student service
   async createStudent(student: IUser): Promise<IUser|string> {
        const ifexistingStudent= await this.StudentRepository.findByEmail(student.email)
        if(ifexistingStudent){
            // throw new Error("A student with this email already exists.")
            return "A student with this email already exists"
        }
        const hashPassword =await this.bycrpt.hashPassword(student.password)
        student.password=hashPassword
        return await this.StudentRepository.createStudent(student)
    }

    
    //update student service

   async updateStudent(_id:string,student: Partial<IUser>): Promise<IUser | null> {
        const studentExist= await this.StudentRepository.findById(_id)
        if(!studentExist){
            throw new Error("student not exist")
        }
        return this.StudentRepository.updateStudent(_id,student)
    }

    //login student

   async loginStudent(email:string,password:string):Promise<IUser|null> {
        const studentData=await this.StudentRepository.findByEmail(email)
        if(!studentData){
            throw new Error("user not exist")
        }
        const matchPassword= await this.bycrpt.comparePassword(password,studentData.password)
        console.log(matchPassword)
        if(!matchPassword){ 
            throw new Error("Invalid password")
        }
        return studentData
    }

}   