import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/im-memory/im-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'Tobias',
      email: 'tobiasa@gmail.com',
      password: '1234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'Tobias',
      email: 'tobiasa@gmail.com',
      password: '1234567'
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {

    const email = 'tobias@gmail.com'

    await sut.execute({
      name: 'Tobias',
      email,
      password: '1234567'
    })

    await expect(() =>
      sut.execute({
        name: 'Tobias',
        email,
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

