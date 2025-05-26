export interface IUser {
    _id?:string;
    name:string;
    email:string;
    course?:string;
    password:string;
    role:'student'|'admin';
}