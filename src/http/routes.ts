import { FastifyInstance } from 'fastify'
import { register } from './controllers/registerController'
import { authenticate } from './controllers/authenticateController'
import { getProfile } from './controllers/getProfileController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/getuser/:id', getProfile)
}
