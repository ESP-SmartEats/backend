import { Router } from 'express'

const router = Router()

router.get('/photo-detection', (req, res) => {
  res.json({ message: 'photo detection' })
})

router.get('/photo-detection/details', (req, res) => {
  res.json({ message: 'photo detection details' })
})

export default router
