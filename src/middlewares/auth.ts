import 'express-session';
import { Request, Response, NextFunction } from "express";
import{IUser} from '../interfaces/User'
declare module 'express-session' {
  interface SessionData {
    admin?: { email: string }|false;
    // user?: { _id: string }|true|false|IUser;
    user?: string | { email: string } | true | false | IUser;
  }
}
export const adminAuth=(req: Request,res: Response,next: NextFunction):void=>{
    if (req.session && req.session.admin) {
        return next();
      }
      res.status(401).json({ message: "Unauthorized. Please log in." });
}
export const userAuth=(req: Request,res: Response,next: NextFunction):void=>{
    if (req.session && req.session.user) {
        return next();
      }
      res.status(401).json({ message: "Unauthorized. Please log in." });
}