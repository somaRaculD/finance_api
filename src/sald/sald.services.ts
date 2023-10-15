import { HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { SaldUsuario } from "../entity/Sald";
import { Repository } from "typeorm";
import { verify } from "jsonwebtoken";

export default class EntryServices {
    constructor(
        @Inject('SALD_REPOSITORY')
        private repositoryEntry: Repository<SaldUsuario>
    ) { }

    async findAll(request: Request): Promise<SaldUsuario[]> {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('Sem Autenticação', HttpStatus.UNAUTHORIZED);
        const [, token] = authHeader.split(' ');

        try {
            const { data: { id } } = verify(token, 'shh')
            const costs = await this.repositoryEntry.query(`select * from vw_saldoUsuario where id = '${id}'`);
            return costs;
        } catch (error) {
            throw new HttpException('Sem autorização válida!', HttpStatus.UNAUTHORIZED);
        }
    }
}
