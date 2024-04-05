import * as recipesRoute from './recipes'
import * as exercisesRoute from './exercises'
import * as foodsRoute from './foods'
import * as mealPlannerRoute from './mealPlanner'
import { Router } from 'express'

const router = Router()

router.use(recipesRoute.default)
router.use(exercisesRoute.default)
router.use(foodsRoute.default)
router.use(mealPlannerRoute.default)

export default router
