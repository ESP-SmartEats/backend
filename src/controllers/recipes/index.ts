import { type Request, type Response } from 'express'

const getRecipes = (req: Request, res: Response): void => {
  res.json({ message: 'Hello from the controller!' })
}

export default getRecipes
