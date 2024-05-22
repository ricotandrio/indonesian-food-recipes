import { PrismaClient } from "@prisma/client";
import { ResponseError } from "../libs/ResponseError";

export class AccountService {

  static async login({ db, email, password } : {
    db: PrismaClient, email: string, password: string
  }) {
    const account = await db.account.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if(!account) throw new ResponseError(404, "Account not found");

    return account;    
  }

  static async register({ db, email, password } : {
    db: PrismaClient, email: string, password: string
  }) {
    const account = await db.account.create({
      data: {
        email: email,
        password: password,
      },
    });

    if(!account) throw new ResponseError(500, "Internal Server Error");

    return account;
  }
  
}