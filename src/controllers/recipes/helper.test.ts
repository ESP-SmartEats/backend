import { getNextPageParam } from './helper'

describe('getNextPageParam', () => {
  it('should return the _cont parameter value when it is present', () => {
    const url = 'https://example.com/api/endpoint?_cont=ShortURLValue'
    const result = getNextPageParam(url)
    expect(result).toBe('ShortURLValue')
  })

  it('should return null when _cont parameter is not present', () => {
    const url = 'https://example.com/api/endpoint?foo=bar'
    const result = getNextPageParam(url)
    expect(result).toBeNull()
  })

  it('should return null when _cont parameter has an empty value', () => {
    const url = 'https://example.com/api/endpoint?_cont='
    const result = getNextPageParam(url)
    expect(result).toBeNull()
  })

  it('should return null for an empty URL', () => {
    const url = ''
    const result = getNextPageParam(url)
    expect(result).toBeNull()
  })
})
