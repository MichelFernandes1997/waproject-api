import { Router } from "express"

import LaboratorioController from "../controller/Laboratorio/LaboratorioController"

const laboratorioRoute = Router()

laboratorioRoute.get('/laboratorio', LaboratorioController.index)

laboratorioRoute.get('/laboratorio/:id', LaboratorioController.findOne)

laboratorioRoute.post('/laboratorio', LaboratorioController.upsert)

laboratorioRoute.put('/laboratorio', LaboratorioController.upsert)

laboratorioRoute.delete('/laboratorio/:id', LaboratorioController.delete)

export default laboratorioRoute