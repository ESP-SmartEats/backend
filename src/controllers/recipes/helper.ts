const getNextPageParam = (url: string): string | null => {
  const queryString = url.split('?')[1]

  if (queryString) {
    const queryParams = queryString.split('&')

    for (const param of queryParams) {
      const [key, value] = param.split('=')
      if (key === '_cont' && value !== '') {
        // Check for a non-empty value
        return decodeURIComponent(value)
      }
    }
  }

  return null
}

export { getNextPageParam }
