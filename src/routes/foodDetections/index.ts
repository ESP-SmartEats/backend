import { Router, type Request, type Response } from 'express'
import verifyToken from '../../middleWare'
import { getFoodDetections } from '../../controllers'

const router = Router()

router.use('/food-detections', verifyToken)

router.post('/food-detections', async (req: Request, res: Response): Promise<void> => {
  const result = await getFoodDetections(req, res)

  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

export default router
