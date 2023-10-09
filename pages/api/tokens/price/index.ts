import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTokenPrice } from '../../../../src/services/tokens'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { tokenAddress } = req.body
  switch (method) {
    case 'POST':
      // try {
      if (!tokenAddress) throw new Error('Token address not found')
      const response = await getTokenPrice(tokenAddress)
      const { error, data } = response
      const isNotFoundError = !_.isEmpty(error) && error.code === 404
      const status = isNotFoundError ? 404 : 200
      return res.status(status).json({
        ok: !isNotFoundError,
        status,
        ...(!isNotFoundError
          ? {
              token: {
                ...data,
                contract: tokenAddress
              }
            }
          : {
              error: 'Error getting token'
            })
      })
    // } catch (e) {
    //   return res.status(400).json({
    //     error: 'Error getting token'
    //   })
    // }
    // break

    default:
      res.status(400).json({ message: 'NOT SUPPORTED' })
      break
  }
}

export default handler
