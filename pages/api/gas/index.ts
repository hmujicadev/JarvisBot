import type { NextApiRequest, NextApiResponse } from 'next'
import { getCurrentGasPrices } from '../../../src/services/bsc'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const response = await getCurrentGasPrices()
        return res.status(200).json(response)
      } catch (e) {
        console.log('e', e)
        return res.status(400).json({
          error: 'Error getting suggested gas tracker prices'
        })
      }

    default:
      res.status(400).json({ message: 'NOT SUPPORTED' })
      break
  }
}

export default handler
