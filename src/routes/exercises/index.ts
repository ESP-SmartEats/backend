import { Router } from 'express'
import {
  getExercises,
  getExerciseName,
  getExercisesBodyPart,
  getExercisesEquipment,
  getExercisesTarget,
} from '../../controllers'

const router = Router()

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get a list of exercises
 *     description: Retrieve a list of exercises based on specified parameters.
 *     responses:
 *      200:
 *       description: A list of exercises.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/IExercise'
 */
router.get('/exercises', async (req, res) => {
  const result = await getExercises(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

/**
 * @swagger
 * /exercises/name/{name}:
 *   get:
 *     summary: Get a list of exercises by name
 *     description: Retrieve a list of exercises by name.
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        description: The name of the exercise to retrieve.
 *     responses:
 *      200:
 *       description: A list of exercises.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/IExercise'
 */
router.get('/exercises/name/:name', async (req, res) => {
  const result = await getExerciseName(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

/**
 * @swagger
 * /exercises/body-part/{bodyPart}:
 *   get:
 *     summary: Get a list of exercises by body part
 *     description: Retrieve a list of exercises by body part.
 *     parameters:
 *      - in: path
 *        name: bodyPart
 *        schema:
 *         $ref: '#/components/schemas/BodyPart'
 *        description: The body part of the exercise to retrieve.
 *     responses:
 *      200:
 *       description: A list of exercises.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/IExercise'
 */
router.get('/exercises/body-part/:bodyPart', async (req, res) => {
  const result = await getExercisesBodyPart(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

/**
 * @swagger
 * /exercises/equipment/{equipment}:
 *   get:
 *     summary: Get a list of exercises by equipment
 *     description: Retrieve a list of exercises by equipment.
 *     parameters:
 *      - in: path
 *        name: equipment
 *        schema:
 *         $ref: '#/components/schemas/Equipment'
 *        description: The equipment of the exercise to retrieve.
 *     responses:
 *      200:
 *       description: A list of exercises.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/IExercise'
 */
router.get('/exercises/equipment/:equipment', async (req, res) => {
  const result = await getExercisesEquipment(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

/**
 * @swagger
 * /exercises/target/{target}:
 *   get:
 *     summary: Get a list of exercises by target
 *     description: Retrieve a list of exercises by target.
 *     parameters:
 *      - in: path
 *        name: target
 *        schema:
 *         $ref: '#/components/schemas/Target'
 *        description: The target of the exercise to retrieve.
 *     responses:
 *      200:
 *       description: A list of exercises.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/IExercise'
 */
router.get('/exercises/target/:target', async (req, res) => {
  const result = await getExercisesTarget(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})
export default router
