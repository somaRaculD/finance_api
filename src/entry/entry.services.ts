import { HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import Entry from "../entity/Entry";
import { Repository } from "typeorm";
import { verify } from "jsonwebtoken";
import { EntryDto } from "./entry.interface";

export default class EntryServices {
    constructor(
        @Inject('ENTRY_REPOSITORY')
        private repositoryEntry: Repository<Entry>
    ) { }

    async findAll(request: Request): Promise<Entry[]> {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('Sem Autenticação', HttpStatus.UNAUTHORIZED);
        const [, token] = authHeader.split(' ');

        try {
            const { data: { id } } = verify(token, 'shh')
            const costs = await this.repositoryEntry.query(`
            select iduser, u."name", idtypeincome, sum(value) as value, descripition  from income i
            join "user" u on iduser = u.id
            where iduser = '${id}'
            group by iduser, idtypeincome, descripition, u.name
            `);
            return costs;
        } catch (error) {
            throw new HttpException('Sem autorização válida!', HttpStatus.UNAUTHORIZED);
        }
    }

    async findEntrytPerId(idcost: number, request: Request): Promise<Entry> {
        const costOne = await this.repositoryEntry.findOne({ where: { id: idcost } });
        return costOne;
    }

    async create(dto: EntryDto, request: Request): Promise<any> {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('Sem Autenticação', HttpStatus.UNAUTHORIZED);
        const [, token] = authHeader.split(' ');
        try {
            const { data: { id } } = await verify(token, 'shh');
            const create = this.repositoryEntry.create({ ...dto, iduser: id, idtypeincome: dto.idtypeincome == 0 ? null : dto.idtypeincome });
            return await this.repositoryEntry.save(create);
        } catch (error) {
            console.log(error)
            throw new NotFoundException('Custo não criado')
        }
    }
}