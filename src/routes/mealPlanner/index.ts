import { Router, type Request, type Response } from 'express'
import { getMealPlaner } from '../../controllers'
import verifyToken from '../..//middleWare'

const router = Router()

router.use('/meal-planner', verifyToken)

router.get('/meal-planner', async (req: Request, res: Response): Promise<void> => {
  const result = await getMealPlaner(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

export default router
