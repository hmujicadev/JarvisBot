import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllTokensPrice } from '../../../../../src/services/tokens'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const response = await getAllTokensPrice()
        return res.status(200).json(response)
      } catch (e) {
        console.log('e', e)
        return res.status(400).json({
          error: 'Error getting token balance'
        })
      }
      break

    default:
      res.status(400).json({ message: 'NOT SUPPORTED' })
      break
  }
}

export default handler
