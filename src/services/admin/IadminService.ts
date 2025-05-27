import{IUser} from '../../interfaces/User'
export interface IadminService{
    adminLogin(email:string, password:string):Promise<IUser>
    listStudents():Promise<IUser[]>
    deleteStudent(id:string):Promise<IUser | null>
    updateStudent(id:string, student:Partial<IUser>):Promise<Partial<IUser> | null>
}