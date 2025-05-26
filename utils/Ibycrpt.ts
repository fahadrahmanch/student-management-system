export interface IHash{
    hashPassword(password:string):Promise<string>
    comparePassword(password:string,password2:string):Promise<Boolean>
}