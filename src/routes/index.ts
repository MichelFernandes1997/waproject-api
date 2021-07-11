import { Request, Response, Router } from 'express'

import exameRoute from './exameRoute'

import laboratorioRoute from './laboratorioRoute'

import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../doc/swagger.json'

const routes = Router()

routes.get('/healthcheck', (req: Request, res: Response) => {
    return res.send('Api are running!')
})

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

routes.use(exameRoute, laboratorioRoute)

export default routes