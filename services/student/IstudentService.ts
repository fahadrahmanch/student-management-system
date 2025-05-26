import {IUser} from '../../interfaces/User'

export interface IstudentService{
    createStudent(student:IUser):Promise<IUser|string>;
    updateStudent(_id:string,student:Partial<IUser>):Promise<IUser|null >;
    loginStudent(email:string,password:string):Promise<IUser|null > ;  
} 