import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -23.4815488,
      longitude: -47.4382336,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: -23.4815488,
      longitude: -47.4382336,
      description: null,
      phone: null
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        latitude: -23.4815488,
        longitude: -47.4382336,
        description: null,
        phone: null
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' })
    ])
  })
})

