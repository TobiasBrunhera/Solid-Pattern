import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/im-memory/im-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist-error'

describe('Register Use Case', () => {

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Tobias',
      email: 'tobiasa@gmail.com',
      password: '1234567'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'tobias@gmail.com'

    await registerUseCase.execute({
      name: 'Tobias',
      email,
      password: '1234567'
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Tobias',
        email,
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

