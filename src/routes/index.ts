import { Router } from 'express'
import SampleController from '../controllers/sampleController'

const router = Router()
const sampleController = new SampleController()

router.get('/sample', sampleController.sayHello)

export default router
