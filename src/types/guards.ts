interface HttpError {
  code: string
  error: string
}

export const isHttpError = (x: any): x is HttpError => {
  return typeof x.code === 'string'
}
