import { Router } from 'express'

import exameRoute from './exameRoute'

import laboratorioRoute from './laboratorioRoute'

const routes = Router()

routes.get('/healthcheck', (req, res) => {
    return res.send('Api are running"!')
})

routes.use(exameRoute, laboratorioRoute)

export default routes