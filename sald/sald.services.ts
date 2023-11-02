import { HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { SaldUsuario } from "../src/entity/Sald";
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
            const sald = await this.repositoryEntry.query(`select sum(TotalIncome - TotalCost) as TotalSaldo, ui."name", ui."FirstIncome", ci."FirstCost", ci."LastCost", ui."FirstIncome" from  (
                select sum(value) as TotalIncome, u."name", min(data) as "FirstIncome", max(data) as "LastIncome", iduser from income i 
                join "user" u on u.id = i.iduser 
                where iduser = ${id}
                group by iduser, u."name" 
                ) ui 
                left join (
                select sum(price) as TotalCost, u."name", max(data) as "LastCost", min(data) as "FirstCost", iduser  from "cost" c
                join "user" u on u.id = c.iduser 
                where iduser = ${id}
                group by iduser, u."name") ci on ci.iduser = ui.iduser group by ui."name", ui."FirstIncome", ci."FirstCost", ci."LastCost", ui."FirstIncome"
                `);
            return sald;
        } catch (error) {
            throw new HttpException('Sem autorização válida!', HttpStatus.UNAUTHORIZED);
        }
    };
}
