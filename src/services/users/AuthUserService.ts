import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign  } from 'jsonwebtoken'

interface AuthRequest{
    email:string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }:AuthRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("user/password incorrect")
        }

        const passwordMath = await compare(password, user.password)

        if(!passwordMath){
            throw new Error("user/password incorrect")
        }


        //gerar token JWT
        const token = sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '365d'
        }
        )


        return{ 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }
}

export { AuthUserService }