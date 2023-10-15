import { HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import Cost from "src/entity/Cost";
import { verify } from "jsonwebtoken";
import { Repository } from "typeorm";
import { CostDto } from "./cost.interface";

export default class CostServices {
    constructor(
        @Inject('COST_REPOSITORY')
        private repositoryCost: Repository<Cost>
    ) { }

    async findAll(request: Request): Promise<Cost[]> {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('Sem Autenticação', HttpStatus.UNAUTHORIZED);
        const [, token] = authHeader.split(' ');

        try {
            const { data: { id } } = verify(token, 'shh');
            const costs = await this.repositoryCost.query(`select * from "cost" c join "typeCost" tc on c.idtypecost = tc.id join "user" u on iduser = u.id  where iduser = '${id}'`);
            
            return costs;
        } catch (error) {
            console.log(error, '[123456790]')
            throw new HttpException('Sem autorização válida!', HttpStatus.UNAUTHORIZED);
        }
    }

    async findCostPerId(idcost: number, request: Request): Promise<Cost> {
        const costOne = await this.repositoryCost.findOne({ where: { id: idcost } });
        return costOne;
    }

    async create(dto: CostDto, request: Request): Promise<any> {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('Sem Autenticação', HttpStatus.UNAUTHORIZED);
        const [, token] = authHeader.split(' ');
        try {
            const { data: { id } } = verify(token, 'shh');
            const create = this.repositoryCost.create({...dto, iduser: id, data: new Date()});
            return await this.repositoryCost.save(create);
        } catch (error) {
            console.log(error)
            throw new NotFoundException('Custo não criado')
        }
    }
}