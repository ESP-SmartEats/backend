import * as recipesRoute from './recipes'
import * as photoDetectionRoute from './photoDetection'
import { Router } from 'express'

const router = Router()

router.use(recipesRoute.default)
router.use(photoDetectionRoute.default)

export default router
