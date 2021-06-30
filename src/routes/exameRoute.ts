import { Router } from "express"

const exameRoute = Router()

exameRoute.get('/exame', (req, res) => { return res.send('GET Exames') })

exameRoute.post('/exame', (req, res) => { return res.send('POST Exames') })

exameRoute.put('/exame', (req, res) => { return res.send('PUT Exames') })

exameRoute.delete('/exame', (req, res) => { return res.send('DELETE Exames') })

export default exameRoute