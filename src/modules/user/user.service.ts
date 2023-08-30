import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {

constructor(private prisma: PrismaService){}

    async create(data: UserDTO) {
        const userExists = await this.prisma.users.findFirst({
            where: {
                email: String (data.email),
            }
        })

        if(userExists){
            throw new Error("User already exists");
        }

        const user = await this.prisma.users.create({
                data,
            });

        return user;
     }

     async findAll(){
        return this.prisma.users.findMany();
     }

     async update(id: string, data: UserDTO){
        const userExists = await this.prisma.users.findUnique({
            where: {
                id,
            }
     });

     if(!userExists){
        throw new Error("User does not exist");
     }

     return await this.prisma.users.update({
        data,
        where: {
            id
        }});

    }

    async delete(id: string) {
        const userExists = await this.prisma.users.findUnique({
            where: {
                id,
            }
     });

     if(!userExists){
        throw new Error("User does not exist");
     }

     return await this.prisma.users.delete({
        where:{
            id,
        }
     })

    }


}
