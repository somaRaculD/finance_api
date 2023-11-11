import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common"
import User from "../entity/userEntity"
import { Repository } from "typeorm";
import { UserDto } from "./user.interface";
import { SessionDto } from "./session.interface";
import { sign, verify } from "jsonwebtoken";
import { Request } from "express";
import { compare, hash } from 'bcrypt'

export interface Token {
    token: String;
    dateExp: number;
    user: String;
}

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    async findAll(request: Request): Promise<User[]> {
        const headerAuth = request.headers.authorization;
        if (!headerAuth) throw new HttpException('Sem autorização', HttpStatus.UNAUTHORIZED);
        const [, token] = headerAuth.split(' ');

        try {
            const { data: { id } } = await verify(token, 'shh');
            const users = await this.userRepository.find({ where: { id: id } });
            return users;
        } catch (error) {
            throw new HttpException('Não foi possivel achar a atenticação do usuário', HttpStatus.NOT_FOUND);
        }
    }

    async create(createUser: UserDto): Promise<any> {
        try {
            const { password, confPassword } = createUser;
            if (!password.match(confPassword)) {
                throw new NotFoundException('Senha e confirmação de senha estão divergentes');
            }

            const passwordHashed:any = await hash(password, 12, (err, hash) => {
                return hash;
            });

            const user = this.userRepository.create({...createUser, password: passwordHashed || ''})
            return await this.userRepository.save(user)
        } catch (err) {
            throw new NotFoundException(`user not created`)
        }
    }

    async createSession(createSession: SessionDto): Promise<Token> {
        try {
            const user = await this.userRepository.findOne({ where: { email: createSession.email } });
            const passwordHashed = await hash(createSession.password, 12);
            const match = await compare(passwordHashed, user.password);
            console.log(passwordHashed, user.password)
            if(!match) {
                throw new HttpException('Senha inválida!', HttpStatus.UNAUTHORIZED);
            }
            const session = sign({ data: { id: user.id } }, 'shh', { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 3) });
            return { token: session, dateExp: Math.floor(Date.now() / 1000) + (60 * 60 * 3), user: user.name };
        } catch (err) {
            throw new HttpException('Not Found Login', HttpStatus.UNAUTHORIZED);
        }
    }
}
