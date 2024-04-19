import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetProfileUseCase } from '@/use-cases/factories/make-getProfile-use-case'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileBobySchema = z.object({
    id: z.string(),
  })

  const { id } = getProfileBobySchema.parse(request.params)

  try {

    const getProfileUseCase = makeGetProfileUseCase()

    const user = await getProfileUseCase.execute({
      userId: id
    })

    return reply.status(200).send({ user: user })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}