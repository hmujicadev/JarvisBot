import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { checkProviderAvailability } from '../../../src/services/providers'
import { isHttpError } from '../../../src/types/guards'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { providerURL } = req.body
  switch (method) {
    case 'POST':
      await checkProviderAvailability(providerURL).catch((e) => {
        const isNotFoundError = isHttpError(e) && !_.isEmpty(e.code)
        const status = isNotFoundError ? 400 : 200

        return res.status(status).json({
          ok: !isNotFoundError,
          status,
          error: 'Error checking provider',
          code: isHttpError(e) ? e.code : null
        })
      })

    default:
      res.status(400).json({ message: 'NOT SUPPORTED' })
      break
  }
}

export default handler
