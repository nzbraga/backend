import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    
    //receber token
    const authToken = req.headers.authorization;   

    
    if(!authToken){
        return res.status(401).end();
    }
        
    const [, token] = authToken.split(" ")
       
    try{
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;
        
        //recuperara id token "@types/express"
        req.user_id = sub;

        return next();

       
    }catch(err){
        return res.status(401).end();
    }
    

}