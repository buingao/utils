const urlHandler = {
  obj2queryParams: (
    obj: Record<string, string | number | undefined | null | boolean>
  ) => {
    const queryParams = new URLSearchParams()
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, String(value))
      }
    })
    const result = queryParams.toString()
    return result
  }
}

export default urlHandler
