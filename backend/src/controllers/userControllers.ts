import { User } from "@prisma/client";
import { Request, Response } from "express";
import { generateToken } from "../helper/generateToken";
import { bcryptHash, bcryptHashCompare } from "../helper/bcryptHash";
import prismaClient from "../prismaClient";

const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, picture } = req.body;
    
    if (!name ?? !email ?? !password) {
        return res.status(400).send("Name, Email, Password undefined");
    }

    const _user = await prismaClient.user.findUnique({ where: { email } });

    if(_user) {
        return res.status(400).send("User exists");
    }

    const _createdUser = await prismaClient.user.create({ data: { name, email, password: (await bcryptHash(password)), picture } });
    return res.status(200).json({..._createdUser, token: generateToken(_createdUser.id)})
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email ?? !password) {
        return res.status(400).send(" Email, Password undefined");
    }

    const _user = await prismaClient.user.findUnique({ where: { email } });

    if (_user && (await bcryptHashCompare(password, _user.password))) {
        return res.status(200).json({..._user, token: generateToken(_user.id)})
    }

    // const _createdUser = await prismaClient.user.create({ data: { name, email, password, picture } });
}

export { registerUser, loginUser };