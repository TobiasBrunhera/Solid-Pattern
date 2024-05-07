import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.body)

  const validateCheckInUsecase = makeValidateCheckInUseCase()

  await validateCheckInUsecase.execute({
    checkInId
  })

  return reply.status(204).send()
}