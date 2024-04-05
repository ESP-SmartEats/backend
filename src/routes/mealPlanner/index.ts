import { Router, type Request, type Response } from 'express'
import { getMealPlaner } from '../../controllers'
import verifyToken from '../../middleWare'

const router = Router()

router.use('/meal-planner', verifyToken)

/**
 * @swagger
 * /meal-planner:
 *  get:
 *    summary: Get meal planner
 *    description: Retrieve a meal planner based on specified parameters.
 *    parameters:
 *      - in: query
 *        name: height
 *        schema:
 *          type: number
 *        description: The height of the user.
 *        required: true
 *      - in: query
 *        name: weight
 *        schema:
 *          type: number
 *        description: The weight of the user.
 *        required: true
 *      - in: query
 *        name: age
 *        schema:
 *          type: number
 *        description: The age of the user.
 *        required: true
 *      - in: query
 *        name: gender
 *        schema:
 *          $ref: '#/components/schemas/Gender'
 *        description: The gender of user.
 *        required: true
 *      - in: query
 *        name: activityLevel
 *        schema:
 *          $ref: '#/components/schemas/ActivityLevel'
 *        description: The activity level of the user.
 *      - in: query
 *        name: weightChange
 *        schema:
 *          type: number
 *        description: The target weight change of the user.
 *      - in: query
 *        name: timeDuration
 *        schema:
 *          type: number
 *        description: The time duration for the target weight change (weeks).
 *      - in: query
 *        name: cuisineType
 *        schema:
 *          $ref: '#/components/schemas/TCuisineType'
 *        description: The cuisine type for the recipes.
 *      - in: query
 *        name: diet
 *        schema:
 *          $ref: '#/components/schemas/TDiet'
 *        description: The diet type for the recipes.
 *      - in: query
 *        name: dishType
 *        schema:
 *          $ref: '#/components/schemas/TDishType'
 *        description: The dish type for the recipes.
 *      - in: query
 *        name: excluded
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: An array of ingredients to be excluded from the recipes.
 *      - in: query
 *        name: health
 *        schema:
 *          $ref: '#/components/schemas/THealth'
 *        description: The health label for the recipes.
 *      - in: query
 *        name: mealType
 *        schema:
 *          $ref: '#/components/schemas/TMealType'
 *        description: The meal type for the recipes.
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IMealPlanner'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IError'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            type: string
 */
router.get('/meal-planner', async (req: Request, res: Response): Promise<void> => {
  const result = await getMealPlaner(req, res)
  res.json(result)
  console.log(`Request: ${req.originalUrl}\n`)
})

export default router
