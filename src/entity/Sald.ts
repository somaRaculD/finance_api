import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
    name: 'vw_saldoUsuario'
})
export class SaldUsuario {
    @ViewColumn()
    name: string;

    @ViewColumn()
    totalentrada: number;

    @ViewColumn()
    totalCost: number;

    @ViewColumn()
    saldototal: number;

}