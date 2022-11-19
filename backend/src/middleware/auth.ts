import { prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prismaClient from "../prismaClient";

async function protect(req: Request, res: Response, next: NextFunction) {    
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            const token = authHeader.split(" ")[1];            
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

            res.locals.user = await prismaClient.user.findUnique({
                where: {
                    id: (decoded as JwtPayload).id
                },
                select: {
                    id: true, chats: true, email: true, name: true, picture: true,
                }
            });       
            
            next();
        } catch (error) {
            console.log(error);
            return res.json(error).status(400);
        }
    } else {
        return res.status(400).send("Not authorized");
    }
}

export {protect}