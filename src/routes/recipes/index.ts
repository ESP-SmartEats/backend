import { Router, type Request, type Response } from 'express'
import { getRecipes, getDetailsRecipe } from '../../controllers'

const router = Router()

router.get('/recipes', async (req: Request, res: Response): Promise<void> => {
  const result = await getRecipes(req, res)
  res.json(result)
})

router.get('/recipes/:id', async (req: Request, res: Response): Promise<void> => {
  const result = await getDetailsRecipe(req, res)
  res.json(result)
})

export default router
