import { User } from "@prisma/client";
import { Request, Response } from "express";
import { generateToken } from "../helper/generateToken";
import { bcryptHash, bcryptHashCompare } from "../helper/bcryptHash";
import prismaClient from "../prismaClient";

const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, picture } = req.body;
    console.log(name, email, password, picture, "LOG1");
    
    if (!name ?? !email ?? !password) {
        return res.status(400).send("Name, Email, Password undefined");
    }

    const _user = await prismaClient.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, picture: true }
    });

    if(_user) {
        return res.status(400).send("User exists");
    }

    const _createdUser = await prismaClient.user.create({
        data: { name, email, password: (await bcryptHash(password)), picture },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true
        }
    });
    return res.status(200).json({..._createdUser, token: generateToken(_createdUser.id)})
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    if (!email ?? !password) {
        return res.status(400).send(" Email, Password undefined");
    }

    const _user = await prismaClient.user.findUnique({ where: { email } })

    if (_user && (await bcryptHashCompare(password, _user.password))) {
        return res.status(200).json({..._user, password: "" , token: generateToken(_user.id)})
    }
    
    return res.status(400).json("User not found")
}

const getUser = async (req: Request, res: Response) => {
    const { search } = req.query;
    
    if (!search) {
        return res.status(400).send("No search query")
    }    
    const user = await prismaClient.user.findMany({
        where: {
            OR: {
                email: { contains: search as string, mode: "insensitive" },
                name: { contains: search as string, mode: "insensitive" }
            }
        },
        select: { id: true, email: true, name: true, picture: true } 
    });
    return res.send(user);
}

export { registerUser, loginUser, getUser };