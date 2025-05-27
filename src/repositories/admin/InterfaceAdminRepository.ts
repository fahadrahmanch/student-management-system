import{IUser}from '../../interfaces/User'
export interface IadminRepository{
    updateStudent(id:string,student:Partial<IUser>):Promise<IUser|null>
    findById(_id:string):Promise<IUser|null>
    deleteStudent(id:string):Promise<IUser | null>
    listStudents():Promise<IUser[]>
    findByEmail(email:string):Promise<IUser|null>
}