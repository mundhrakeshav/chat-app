import { Request, Response } from "express";
import prismaClient from "../prismaClient";

async function accessChat(req: Request, res: Response) {
    const {userID} = req.body;
    if (!userID) {
        return res.status(404).send("!UserID")
    }    

    const chats = await prismaClient.chat.findFirst({
        where: {
            userIDs: {
                hasEvery: [res.locals.user.id, userID],
            },
            isGroupChat: false
        },
        select: {
            users: {
                select: {
                    id: true,
                    name: true,
                    picture: true,
                    email: true,
                }
            },
            messages: true,
            groupAdmins: true,
        }
    });
    if (chats) {
        return res.status(200).send(chats)
    } else {
        const createdChat = await prismaClient.chat.create({
            data: {
                isGroupChat: false,
                users: {
                    connect: [{ id: res.locals.user.id }, { id: userID }]
                },
            },
            select: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                        email: true,
                    }
                },
                messages: true,
                groupAdmins: true,
            }
        });
        
        return res.status(200).send(createdChat)
    }
}

async function fetchChats(req: Request, res: Response) {
    const chats = await prismaClient.user.findMany({
        where: {
            id: res.locals.user.id
        },
        select: {
            chats: true,
        },
    });

    return res.send(chats)
}

async function createChatGroup(req: Request, res: Response) {
    console.log(req.body);
    
    if (!req.body.users || !req.body.name) {
        return res.status(400).send("Data insufficient")
    }
    
    const users: any[] = (req.body.users as Array<string>).map((user: string) =>  ({ id: user}));
    users.push({ id: res.locals.user.id })
    console.log(users);

    const createdChat = await prismaClient.chat.create({
        data: {
            groupAdmins: {
                connect: [{ id: res.locals.user.id }]
            },
            isGroupChat: true,
            users: {
                connect: users
            },
            
        }
    });
    return res.status(200).send(createdChat)
}

async function renameGroup(req: Request, res: Response) {
    
    if (!req.body.chatID || !req.body.chatName) {
        return res.status(400).send("Data insufficient chatID, chatName")
    }
    
    let chat = await prismaClient.chat.findFirst({
        where: {
            id: req.body.chatID,
            userIDs: {
                has: res.locals.user.id
            }
        },
    });
    
    if (!chat) {
        return res.status(400).send("Invalid, You're not part of this group")
    }
    
    chat = await prismaClient.chat.update({
        where: {
            id: req.body.chatID,
        },
        data: {
            chatName: req.body.chatName
        }
    });
    

    return res.status(200).send(chat)

}

async function addToGroup(req: Request, res: Response) {
    const { chatID, userID } = req.body;

    if (!chatID || !userID) {
        return res.status(400).send("Data insufficient chatID, userID")
    }
    
    let chat = await prismaClient.chat.findFirst({
        where: {
            id: chatID,
            adminIDs: {
                has: res.locals.user.id
            }
        },
    });
    
    if (!chat) {
        return res.status(400).send("Not Admin")
    }
    
    chat = await prismaClient.chat.update({
        where: {
            id: req.body.chatID,
        }, 
        data: {
            userIDs: {
                push: userID
            }
        },
    });

    return res.status(200).send(chat)
}

async function removeFromGroup(req: Request, res: Response) {
    const { chatID, userID } = req.body;

    if (!chatID || !userID) {
        return res.status(400).send("Data insufficient chatID, userID")
    }
    
    const users = await prismaClient.chat.findFirst({
        where: {
            id: chatID,
            adminIDs: {
                has: res.locals.user.id
            }
        },
        select: {
            userIDs: true
        }
    });
    
    if (!users) {
        return res.status(400).send("Not Admin")
    }
        
    const chat = await prismaClient.chat.update({
        where: {
            id: req.body.chatID,
        }, 
        data: {
            userIDs: { set: (users.userIDs).filter((id) => id !== userID) }
        },
    });

    
    return res.status(200).send(chat)
}

export { accessChat, fetchChats, createChatGroup, renameGroup, addToGroup, removeFromGroup }
