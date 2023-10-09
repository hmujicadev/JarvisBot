import type { NextApiRequest, NextApiResponse } from 'next'
import { getTokensBalanceFromAPI } from '../../../../src/services/tokens'
import { ProviderT } from '../../../../src/types/global'
import { decryptData } from '../../../../src/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { data } = req.body
  const decryptedData = JSON.parse(decryptData(data))
  const { tokenAddress, walletPrivateKeys, provider } = decryptedData
  switch (method) {
    case 'POST':
      try {
        const response = await getTokensBalanceFromAPI(
          tokenAddress,
          walletPrivateKeys.split(','),
          provider
        )
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
