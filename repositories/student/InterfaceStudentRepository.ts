import{IUser} from '../../interfaces/User'
export interface IstudentRepository{
   createStudent(student:IUser):Promise<IUser>
   updateStudent(id:string,student:Partial<IUser>):Promise<IUser|null>
   findById(_id:string):Promise<IUser|null>
   findByEmail(email:string):Promise<IUser|null>
}