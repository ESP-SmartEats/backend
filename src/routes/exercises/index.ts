import { Router } from 'express'
import {
  getExercises,
  getExerciseName,
  getExercisesBodyPart,
  getExercisesEquipment,
  getExercisesTarget,
} from '../../controllers'

const router = Router()

router.get('/exercises', async (req, res) => {
  const result = await getExercises(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

router.get('/exercises/name/:name', async (req, res) => {
  const result = await getExerciseName(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

router.get('/exercises/body-part/:bodyPart', async (req, res) => {
  const result = await getExercisesBodyPart(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

router.get('/exercises/equipment/:equipment', async (req, res) => {
  const result = await getExercisesEquipment(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

router.get('/exercises/target/:target', async (req, res) => {
  const result = await getExercisesTarget(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})
export default router
