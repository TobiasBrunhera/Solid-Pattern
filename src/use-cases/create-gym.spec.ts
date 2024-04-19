import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {

    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      latitude: -23.4815488,
      longitude: -47.4382336,
      description: null,
      phone: null
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

