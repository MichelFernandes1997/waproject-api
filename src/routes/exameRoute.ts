import { Router } from "express"

import ExameController from "../controller/Exame/ExameController"

const exameRoute = Router()

exameRoute.get('/exame', ExameController.index)

exameRoute.get('/exame/:id', ExameController.findOne)

exameRoute.post('/exame', ExameController.upsert)

exameRoute.put('/exame', ExameController.upsert)

exameRoute.delete('/exame/:id', ExameController.delete)

exameRoute.put('/exame/restore', ExameController.restore)

export default exameRoute