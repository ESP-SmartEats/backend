import { Router, type Request, type Response } from 'express'
import { getFoods } from '../../controllers'
import verifyToken from '../..//middleWare'

const router = Router()

router.use('/foods', verifyToken)

router.get('/foods', async (req: Request, res: Response): Promise<void> => {
  const result = await getFoods(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

export default router
