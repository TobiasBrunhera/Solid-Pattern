import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository)

  return getProfileUseCase
}