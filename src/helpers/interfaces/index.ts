import { ObjectId } from 'mongoose'

export interface IExame {
    id: ObjectId,
    nome: string,
    tipo: string,
    status: boolean
}

export interface IResponseLaboratorio {
    id: ObjectId,
    nome: string,
    endereco: string,
    status: string,
    exames: IExame[]
}

export interface ILaboratorio {
    id: ObjectId,
    nome: string,
    endereco: string,
    status: boolean
}

export interface IResponseExame {
    id: ObjectId,
    nome: string,
    tipo: string,
    status: string,
    laboratorios: ILaboratorio[]
}