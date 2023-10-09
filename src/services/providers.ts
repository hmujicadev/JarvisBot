import axios from 'axios'

export const checkProviderAvailability = async (providerURL: string) => {
  const local = process.env.LOCALHOST_PROVIDER ?? 'http://127.0.0.1:7545'

  return await axios.get(providerURL)
}
