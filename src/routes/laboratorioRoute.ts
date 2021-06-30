import { Router } from "express"

const laboratorioRoute = Router()

laboratorioRoute.get('/laboratorio', (req, res) => { return res.send('GET Laboratorios\n'.repeat(2000)) })

laboratorioRoute.post('/laboratorio', (req, res) => { return res.send('POST Laboratorio') })

laboratorioRoute.put('/laboratorio', (req, res) => { return res.send('PUT Laboratorio') })

laboratorioRoute.delete('/laboratorio', (req, res) => { return res.send('DELETE Laboratorio') })

export default laboratorioRoute