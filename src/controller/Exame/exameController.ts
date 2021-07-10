import { Request, Response } from 'express'

import mongoose, { ObjectId } from 'mongoose'

import Exame from "../../entity/Exame"

import Laboratorio from '../../entity/Laboratorio'

import { transformStatusExam } from '../../helpers'

// interface IValidateCreateExamesInputs {
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

const ExameController = {
    async index (req: Request, res: Response) {
        try {
            const { withTrashed } = req.query

            const exames = await Exame.find().populate("laboratorios") as any

            const responseExames = transformStatusExam(exames) as Array<IResponseExame>
            
            if (!withTrashed) {
                return res.send(responseExames.filter(item => item.status === 'ativo'))
            } else {
                return res.send(responseExames)
            }
        } catch (err) {
            console.log(err)

            return res.status(500).json(err.message || err)
        }
    },
    async findOne (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            const exame = await Exame.findOne({ _id }).populate("laboratorios")

            const responseExame = transformStatusExam(exame)

            return res.send(responseExame)
        } catch (err) {
            console.log(err)

            return res.status(500).json(err.message || err)
        }
    },
    async upsert (req: Request, res: Response) {
        try {
            let { id, laboratorioId, removerLaboratorio, ...params } = req.body
            
            let exame = await Exame.findOne({ _id: id }) as any
            
            if (params) {
                if (!exame) {
                    exame = {}

                    id = mongoose.Types.ObjectId()

                    params.status = true
                } else {
                    if (params.status || params.status === false) {
                        delete params.status
    
                        if (Object.keys(params).length === 0 && !laboratorioId) {
                            return res.status(200).send({ message: "Nothing are received for update!" })
                        }
                    }
                }

                Object.keys(params).map(key => {
                    exame[key] = params[key]
                })

                await Exame.updateOne(
                    { _id: id } ,
                    exame,
                    {
                        upsert: true
                    }
                )

                exame = await Exame.findOne({ _id: id })
            }

            if (laboratorioId) {
                const laboratorioAtivo = await Laboratorio.findOne({ _id: laboratorioId, status: true })

                if (!laboratorioAtivo) {
                    return res.status(400).send({ message: "Laboratorio inativo: por favor para vincular o laboratorio é necessário que o mesmo esteja ativo" })
                }

                if (!id) {
                    if (exame) {
                        id = exame._id
                    } else {
                        return res.status(400).send({ message: "Campo não encontrado: o campo /id/ do exame não foi encontrado no payload recebido" })
                    }
                }
                
                const exameAtivo = await Exame.findOne({ _id: id, status: true })

                if (!exameAtivo) {
                    return res.status(400).send({ message: "Exame inativo: por favor para vincular o exame à um laboratorio é necessário que o mesmo esteja ativo" })
                }

                const relationOperation = { exame: {}, laboratorio: {} } as any

                if (removerLaboratorio) {
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

            const exameCriado = await Exame.findOne({ _id: id }).populate("laboratorios")

            const responseExame = transformStatusExam(exameCriado)

            return res.json(responseExame)
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

            const exame = await Exame.findOne({ _id })

            if (!exame) {
                return res.json({ message: "Nenhum exame foi deletado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            if (exame.status === false) {
                return res.json({ message: "Nenhum exame foi deletado pois o exame encontrado com o /id/ recebido, já encontra-se removido!" })
            }

            exame.status = false

            await Exame.updateOne(
                { _id },
                exame
            )

            return res.send({ message: `O exame com /id/ igual à ${_id} foi removido com sucesso`})
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

            const exame = await Exame.findOne({ _id }).populate("laboratorios")
            
            if (!exame) {
                return res.json({ message: "Nenhum exame foi restaurado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })
            }

            if (exame.status) {
                return res.json({ message: "Nenhum exame foi restaurado pois o exame encontrado com o /id/ recebido, já encontra-se ativo!" })
            }

            exame.status = true
            
            await Exame.updateOne(
                { _id },
                exame
            )

            const exameRestaurado = await Exame.findOne({ _id }).populate("laboratorios")
            
            const responseExame = transformStatusExam(exameRestaurado)
            
            return res.json(responseExame)
        } catch (err) {
            console.log(err)
            
            return res.status(500).json(err.message || err)
        }
    } 
}

export default ExameController