import { Request, Response } from 'express'

import mongoose, { ObjectId } from 'mongoose'

import Laboratorio from "../../entity/Laboratorio"

import Exame from '../../entity/Exame'

// interface IValidateCreateLaboratorioInputs {
//     nome: {
//         type: string
//         value: any
//     },
//     endereco: {
//         type: string
//         value: any
//     }
// }

// interface IValidateExamesInputs {
//     nome: {
//         type: string
//         value: any
//     },
//     tipo: {
//         type: string
//         value: any
//     }
// }

interface IExame {
    id: ObjectId,
    nome: string,
    tipo: string,
    status: boolean
}

interface IResponseLaboratorio {
    id: ObjectId,
    nome: string,
    endereco: string,
    status: string,
    exames: IExame[]
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

const LaboratorioController = {
    async index (req: Request, res: Response) {
        try {
            const { withTrashed } = req.query

            const laboratorios = await Laboratorio.find().populate("exames") as any
            
            const responseLaboratorios = laboratorios.map(item => {
                return { 
                    ...item._doc,
                    status: item._doc.status ? 'ativo' : 'inativo',
                    exames: item._doc.exames.length > 0
                        ? item._doc.exames.map(exame => (
                            { ...exame._doc, status: exame._doc.status ? 'ativo' : 'inativo' }
                        ))
                        : item._doc.exames
                }
            }) as Array<IResponseLaboratorio>
            
            if (!withTrashed) {
                return res.send(responseLaboratorios.filter(item => item.status === 'ativo'))
            } else {
                return res.send(responseLaboratorios)
            }
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    },
    async findOne (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            const laboratorio = await Laboratorio.findOne({ _id })

            return res.send(laboratorio)
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    },
    async upsert (req: Request, res: Response) {
        try {
            let { id, exameId, removeExame, ...params } = req.body
            
            let productInDb = await Laboratorio.findOne({ _id: id }) as any
            
            if (params) {
                if (!productInDb) {
                    productInDb = {}

                    id = mongoose.Types.ObjectId()
                }

                Object.keys(params).map(key => {
                    productInDb[key] = params[key]
                })

                if (productInDb.status !== false) {
                    productInDb.status = true
                }

                await Laboratorio.updateOne(
                    { _id: id } ,
                    productInDb,
                    {
                        upsert: true
                    }
                )
            }

            if (exameId) {
                const relationOperation = { laboratorio: {}, exame: {} } as any

                if (removeExame) {
                    relationOperation.laboratorio.$pull = { exames: exameId }

                    relationOperation.exame.$pull = { laboratorios: id }
                } else {
                    relationOperation.laboratorio.$push = { exames: exameId }

                    relationOperation.exame.$push = { laboratorios: id }
                }

                await Laboratorio.findByIdAndUpdate(
                    id,
                    relationOperation.laboratorio,
                    {
                        new: true,
                        useFindAndModify: false
                    }
                )

                await Exame.findByIdAndUpdate(
                    exameId,
                    relationOperation.exame,
                    {
                        new: true,
                        useFindAndModify: false
                    }
                )
            }

            const createdProduct = await Laboratorio.findOne({ _id: id })

            return res.json(createdProduct)
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

            const deletedLaboratorio = await Laboratorio.deleteOne({ _id })

            if (deletedLaboratorio.deletedCount === 0) {
                return res.json({ message: "Nenhum laboratorio foi deletado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            return res.send({ message: `O laboratorio com /id/ igual à ${_id} foi removido com sucesso`})
        } catch (err) {
            return res.status(err.code || err.status || err.statusCode || 500).json(err.message || err)
        }
    }
}

export default LaboratorioController