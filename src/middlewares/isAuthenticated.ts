import { HttpException, NestMiddleware, HttpStatus } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';


export default class isAuthenticated implements NestMiddleware {
    use(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const headerAuth = request.headers['authorization'];
        if (!headerAuth) throw new HttpException('Sem autenticação', HttpStatus.BAD_REQUEST)
        const [, token] = headerAuth.split(' ');
        try {
            const decoder = verify(token, 'shh');
            return next()
        } catch (error) {
            throw new Error('Token inválido')
        }
    }
}