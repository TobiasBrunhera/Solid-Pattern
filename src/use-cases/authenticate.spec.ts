import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './autheticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {


    await usersRepository.create({
      name: 'Tobias',
      email: 'tobiasa@gmail.com',
      password_hash: await hash('1234567', 6)
    })

    const { user } = await sut.execute({
      email: 'tobiasa@gmail.com',
      password: '1234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {


    await expect(() => sut.execute({
      email: 'tobiasa@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {


    await usersRepository.create({
      name: 'Tobias',
      email: 'tobiasa@gmail.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'tobiasa@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

