import * as recipesRoute from './recipes'
import * as exercisesRoute from './exercises'
import { Router } from 'express'

const router = Router()

router.use(recipesRoute.default)
router.use(exercisesRoute.default)

export default router
