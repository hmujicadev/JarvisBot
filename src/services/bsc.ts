import cheerio from 'cheerio'
import { axios } from '../config/axios'
import { URLs } from '../constants'

export const getCurrentGasPrices = async () => {
  const response = await axios(`${URLs.bsc_scan}gastracker`)
  const $ = cheerio.load(response.data)

  const standardGas = $('#standardgas').text().replace(' Gwei', '')
  const fastGas = $('#fastgas').text().replace(' Gwei', '')
  const rapidGas = $('#rapidgas').text().replace(' Gwei', '')

  return {
    ok: true,
    prices: {
      standard: standardGas,
      fast: fastGas,
      rapid: rapidGas
    }
  }
}
