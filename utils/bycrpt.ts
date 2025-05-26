import bcrypt from 'bcrypt'
import { IHash } from './Ibycrpt'
export class BcryptService implements IHash{
   
   hashPassword(password:string):Promise<string>{
    return bcrypt.hash(password,10)
   }
    comparePassword(password: string, password2: string): Promise<boolean> {
        return bcrypt.compare(password, password2)
    }
   
}

