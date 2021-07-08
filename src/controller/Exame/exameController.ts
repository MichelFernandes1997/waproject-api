import { Request, Response } from 'express'

import mongoose, { ObjectId } from 'mongoose'

import Exame from "../../entity/Exame"

import Laboratorio from '../../entity/Laboratorio'

// interface ValidateCreateExameInputs {
//     nome: {
//         type: string
//         value: any
//     },
//     tipo: {
//         type: string
//         value: any
//     }
// }

interface ILaboratorio {
    id: ObjectId,
    nome: string,
    endereco: string,
    status: boolean
}

interface IResponseExame {
    id: ObjectId,
    nome: string,
    tipo: string,
    status: string,
    laboratorios: ILaboratorio[]
}

// const validateInputs = (inputs) => {
//     let result = {}
    
//     Object.keys(inputs).map(key => {
//         if (typeof inputs[key].value !== inputs[key].type) {
//             result[key] = { error: `Erro de tipo: campo /${key}/ recebido possui o tipo /${typeof inputs[key].value}/, porém o tipo esperado é ${inputs[key].type}` }
//         }
//     })

//     if (Object.keys(result).length === 0) {
//         result = false
//     }

//     return result
// }

const ExameController = {
    async index (req: Request, res: Response) {
        try {
            const { withTrashed } = req.query

            const exames = await Exame.find().populate("laboratorios") as any

            const responseExames = exames.map(item => {
                return { 
                    ...item._doc,
                    status: item._doc.status ? 'ativo' : 'inativo',
                    laboratorios: item._doc.laboratorios.length > 0
                        ? item._doc.laboratorios.map(laboratorio => (
                            { ...laboratorio._doc, status: laboratorio._doc.status ? 'ativo' : 'inativo' }
                        ))
                        : item._doc.laboratorios
                }
            }) as Array<IResponseExame>
            
            if (!withTrashed) {
                return res.send(responseExames.filter(item => item.status === 'ativo'))
            } else {
                return res.send(responseExames)
            }
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    },
    async findOne (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            const exame = await Exame.findOne({ _id })

            return res.send(exame)
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    },
    async upsert (req: Request, res: Response) {
        try {
            let { id, laboratorioId, removeLaboratorio, ...params } = req.body
            
            let exameInDb = await Exame.findOne({ _id: id }) as any
            
            if (params) {
                if (!exameInDb) {
                    exameInDb = {}

                    id = mongoose.Types.ObjectId()
                }

                Object.keys(params).map(key => {
                    exameInDb[key] = params[key]
                })

                if (exameInDb.status !== false) {
                    exameInDb.status = true
                }

                await Exame.updateOne(
                    { _id: id } ,
                    exameInDb,
                    {
                        upsert: true
                    }
                )
            }

            if (laboratorioId) {
                const relationOperation = { exame: {}, laboratorio: {} } as any

                if (removeLaboratorio) {
                    relationOperation.exame.$pull = { laboratorios: laboratorioId }

                    relationOperation.laboratorio.$pull = { exames: id }
                } else {
                    relationOperation.exame.$push = { laboratorios: laboratorioId }

                    relationOperation.laboratorio.$push = { exames: id }
                }

                await Exame.findByIdAndUpdate(
                    id,
                    relationOperation.exame,
                    {
                        new: true,
                        useFindAndModify: false
                    }
                )

                await Laboratorio.findByIdAndUpdate(
                    laboratorioId,
                    relationOperation.laboratorio,
                    {
                        new: true,
                        useFindAndModify: false
                    }
                )
            }

            const createdExame = await Exame.findOne({ _id: id })

            return res.json(createdExame)
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    },
    async delete (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            if (!_id) {
                return res.status(400).json({ message: 'Campo não encontrado: campo /id/ não foi enviado no payload para remoção' })
            }

            const deletedExame = await Exame.deleteOne({ _id })

            if (deletedExame.deletedCount === 0) {
                return res.json({ message: "Nenhum exame foi deletado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            return res.send({ message: `O Exame com /id/ igual à ${_id} foi removido com sucesso`})
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    }
}

export default ExameController