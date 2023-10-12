import { Router } from 'express'
import { getRecipes } from '../../controllers'

const router = Router()

router.get('/sample', (req, res) => {
  getRecipes(req, res)
})

router.get('/sample/details', (req, res) => {
  res.json({ message: 'sample details' })
})

export default router
