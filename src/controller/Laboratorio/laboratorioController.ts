import { Request, Response } from 'express'

import mongoose, { ObjectId } from 'mongoose'

import Laboratorio from "../../entity/Laboratorio"

import Exame from '../../entity/Exame'

import { transformStatusLaboratory } from '../../helpers'

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

const LaboratorioController = {
    async index (req: Request, res: Response) {
        try {
            const { withTrashed } = req.query
            
            const laboratorios = await Laboratorio.find().populate("exames") as any
            
            const responseLaboratorios = transformStatusLaboratory(laboratorios) as Array<IResponseLaboratorio>
            
            if (!withTrashed) {
                return res.send(responseLaboratorios.filter(item => item.status === 'ativo'))
            } else {
                return res.send(responseLaboratorios)
            }
        } catch (err) {
            console.log(err)

            return res.status(500).json(err.message || err)
        }
    },
    async findOne (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            const laboratorio = await Laboratorio.findOne({ _id }).populate("exames")

            const responseLaboratorio = transformStatusLaboratory(laboratorio)

            return res.send(responseLaboratorio)
        } catch (err) {
            console.log(err)

            return res.status(500).json(err.message || err)
        }
    },
    async upsert (req: Request, res: Response) {
        try {
            let { id, exameId, removerExame, ...params } = req.body
            
            let laboratorio = await Laboratorio.findOne({ _id: id }) as any

            if (params) {
                if (!laboratorio) {
                    laboratorio = {}

                    id = mongoose.Types.ObjectId()

                    params.status = true
                } else {
                    if (params.status || params.status === false) {
                        delete params.status
    
                        if (Object.keys(params).length === 0 && !exameId) {
                            return res.status(200).send({ message: "Nothing are received for update!" })
                        }
                    }
                }

                Object.keys(params).map(key => {
                    laboratorio[key] = params[key]
                })

                await Laboratorio.updateOne(
                    { _id: id } ,
                    laboratorio,
                    {
                        upsert: true
                    }
                )

                laboratorio = await Laboratorio.findOne({ _id: id })
            }

            if (exameId) {
                const exameAtivo = await Exame.findOne({ _id: exameId, status: true })

                if (!exameAtivo) {
                    return res.status(400).send({ message: "Exame inativo: por favor para vincular o exame é necessário que o mesmo esteja ativo" })
                }

                if (!id) {
                    if (laboratorio) {
                        id = laboratorio._id
                    } else {
                        return res.status(400).send({ message: "Campo não encontrado: o campo /id/ do laboratorio não foi encontrado no payload recebido" })
                    }
                }
                
                const labAtivo = await Laboratorio.findOne({ _id: id, status: true })

                if (!labAtivo) {
                    return res.status(400).send({ message: "Laboratorio inativo: por favor para vincular o laboratorio à um exame é necessário que o mesmo esteja ativo" })
                }

                const relationOperation = { laboratorio: {}, exame: {} } as any

                if (removerExame) {
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

            const labCriado = await Laboratorio.findOne({ _id: id }).populate("exames")
            
            const responseLaboratorio = transformStatusLaboratory(labCriado)

            return res.json(responseLaboratorio)
        } catch (err) {
            console.log(err)

            return res.status(500).json(err.message || err)
        }
    },
    async delete (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            if (!_id) {
                return res.status(400).json({ message: 'Campo não encontrado: campo /id/ não foi enviado no payload para remoção' })
            }

            const laboratorio = await Laboratorio.findOne({ _id })

            if (!laboratorio) {
                return res.json({ message: "Nenhum laboratorio foi deletado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            if (laboratorio.status === false) {
                return res.json({ message: "Nenhum laboratorio foi deletado pois o laboratorio encontrado com o /id/ recebido, já encontra-se removido!" })
            }

            laboratorio.status = false

            await Laboratorio.updateOne(
                { _id },
                laboratorio
            )

            return res.send({ message: `O laboratorio com /id/ igual à ${_id} foi removido com sucesso`})
        } catch (err) {
            console.log(err)
            
            return res.status(500).json(err.message || err)
        }
    },
    async restore (req: Request, res: Response) {
        try {
            const { id: _id } = req.body
            
            if (!_id) {
                return res.status(400).json({ message: 'Campo não encontrado: campo /id/ não foi enviado no payload para restauração' })
            }

            const laboratorio = await Laboratorio.findOne({ _id }).populate("exames")
            
            if (!laboratorio) {
                return res.json({ message: "Nenhum laboratorio foi restaurado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            if (laboratorio.status) {
                return res.json({ message: "Nenhum laboratorio foi restaurado pois o laboratorio encontrado com o /id/ recebido, já encontra-se ativo!" })
            }

            laboratorio.status = true
            
            await Laboratorio.updateOne(
                { _id },
                laboratorio
            )

            const laboratorioRestaurado = await Laboratorio.findOne({ _id }).populate("exames")
            
            const responseLaboratorio = transformStatusLaboratory(laboratorioRestaurado)
            
            return res.json(responseLaboratorio)
        } catch (err) {
            console.log(err)
            
            return res.status(500).json(err.message || err)
        }
    }
}

export default LaboratorioController