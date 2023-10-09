import type { NextApiRequest, NextApiResponse } from 'next'
import { buyToken } from '../../../../src/services/trading'
import { decryptData } from '../../../../src/utils'

// code === 'NETWORK_ERROR

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { data } = req.body
  const decryptedData = JSON.parse(decryptData(data))
  const {
    provider,
    tokenToBuy,
    tokenToSpend,
    walletPrivateKeys,
    amount,
    slippage,
    gasLimit,
    gweiCost
  } = decryptedData
  switch (method) {
    case 'POST':
      const response = await buyToken(
        provider,
        tokenToBuy,
        tokenToSpend,
        walletPrivateKeys.split(','),
        amount,
        slippage,
        gasLimit,
        gweiCost
      )
      return res.status(200).json(response)
    default:
      res.status(400).json({ ok: false, message: 'NOT SUPPORTED' })
      break
  }
}

export default handler
