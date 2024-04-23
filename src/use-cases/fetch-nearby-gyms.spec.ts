import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -23.4815488,
      longitude: -47.4382336,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'Far gym',
      latitude: -23.0280348,
      longitude: -47.1272017,
      description: null,
      phone: null
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4815488,
      userLongitude: -47.4382336
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

