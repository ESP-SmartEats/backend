import * as recipesRoute from './recipes'
import * as exercisesRoute from './exercises'
import * as foodsRoute from './foods'
import { Router } from 'express'

const router = Router()

router.use(recipesRoute.default)
router.use(exercisesRoute.default)
router.use(foodsRoute.default)

export default router
