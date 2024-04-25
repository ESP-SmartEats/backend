import config from '../../config'
import type { Request, Response } from 'express'
import { getParamValue } from '../recipes/helper'
import { calculateBMR, calculateCaloriesIntakeAndBurn, calculateCustomMealCalories } from './helper'
import axios from 'axios'
import {
  ActivityLevel,
  BMILevel,
  TMealType,
  type Gender,
  type IExercise,
  type IMealPlanDaily,
  type IMealPlanRequestParams,
  type IMealPlanner,
  type IRecipe,
  type IRecipesRequestParams,
  type TCuisineType,
  type TDiet,
  type TDishType,
  type THealth,
} from '@hienpham512/smarteats'

const apiKey = config.services.recipes.apiKey
const apiId = config.services.recipes.apiId

const apiKeyExercises = config.services.exercises.apiKey
const host = config.services.exercises.host
const urlExercises = config.services.exercises.url

const listExercises = async (): Promise<IExercise[] | undefined> => {
  try {
    const exercises = await axios.get(urlExercises, {
      params: {
        limit: 20,
      },
      headers: {
        'X-RapidAPI-Key': apiKeyExercises,
        'X-RapidAPI-Host': host,
      },
    })

    return exercises.data
  } catch {
    return undefined
  }
}

const getMealPlaner = async (
  req: Request,
  res: Response,
): Promise<
  | IMealPlanner
  | {
      error: {
        code: string
        message: string
      }
    }
> => {
  const { query } = req

  const health = query.health as THealth
  const cuisineType = query.cuisineType as TCuisineType
  const diet = query.diet as TDiet
  const dishType = query.dishType as TDishType
  const excluded = query.excluded as string[] | string | undefined

  const { height, weight } = query

  const timeDuration: number = query.timeDuration ? Number(query.timeDuration) : 1
  const age = Number(query.age)
  const gender = query.gender as Gender
  const weightChange = Number(query.weightChange)
  const activityLevel = query.activityLevel ? query.activityLevel : ActivityLevel.NotActive

  const mealPlanParams: IMealPlanRequestParams = {
    height: Number(height),
    weight: Number(weight),
    age: Number(age),
    gender,
    weightChange,
  }

  const bmr = calculateBMR(mealPlanParams)
  const { dailyCaloriesIntake, dailyCaloriesToBurn } = calculateCaloriesIntakeAndBurn(
    mealPlanParams,
    Number(activityLevel) as ActivityLevel,
  )
  const mealPlan = calculateCustomMealCalories(dailyCaloriesIntake)

  let excludedParams = ''
  if (typeof excluded === 'string') {
    excludedParams += `&excluded=${excluded}`
  } else if (Array.isArray(excluded)) {
    excludedParams += excluded.map((item) => `&excluded=${item}`).join('')
  }

  const baseUrl = `${config.services.recipes.url}?type=public&app_id=${apiId}&app_key=${apiKey}&random=true${excludedParams}`

  const recipesParams: IRecipesRequestParams = {
    cuisineType,
    diet,
    dishType,
    health,
  }

  try {
    const breakfasts = (
      await axios.get(baseUrl, {
        params: {
          ...recipesParams,
          calories: getParamValue(
            `${mealPlan.breakfast - mealPlan.breakfast * 0.3}-${mealPlan.breakfast}`,
          ),
          mealType: TMealType.BREAKFAST,
        },
      })
    ).data.hits as IRecipe[]

    const lunches = (
      await axios.get(baseUrl, {
        params: {
          ...recipesParams,
          calories: getParamValue(`${mealPlan.lunch - mealPlan.lunch * 0.3}-${mealPlan.lunch}`),
          mealType: TMealType.LUNCH,
        },
      })
    ).data.hits as IRecipe[]

    const snacks = (
      await axios.get(baseUrl, {
        params: {
          ...recipesParams,
          calories: getParamValue(`${mealPlan.snack - mealPlan.snack * 0.3}-${mealPlan.snack}`),
          mealType: TMealType.SNACK,
        },
      })
    ).data.hits as IRecipe[]

    const dinners = (
      await axios.get(baseUrl, {
        params: {
          ...recipesParams,
          calories: getParamValue(`${mealPlan.dinner - mealPlan.dinner * 0.3}-${mealPlan.dinner}`),
          mealType: TMealType.DINNER,
        },
      })
    ).data.hits as IRecipe[]

    const exercises = await listExercises()

    const daily: IMealPlanDaily[] = []

    for (let i = 0; i < timeDuration * 7; i++) {
      const breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)]
      const lunch = lunches[Math.floor(Math.random() * lunches.length)]
      const snack = snacks[Math.floor(Math.random() * snacks.length)]
      const dinner = dinners[Math.floor(Math.random() * dinners.length)]

      const exerciseQuantity = Math.floor(Math.random() * 3) + 1

      const exercisesData: Array<{
        calories: number
        exercises: IExercise
        time: number // in minutes
      }> = []

      const caloriesAverage = (Math.floor(Math.random() * 201) + 100) / 15 // 15mn workout burn 100-200 calories
      const caloriesPerExercise = dailyCaloriesToBurn / exerciseQuantity
      const timePerExercise = Math.ceil(caloriesPerExercise / caloriesAverage)

      if (exercises) {
        for (let j = 0; j < exerciseQuantity; j++) {
          const exercise = exercises[Math.floor(Math.random() * exercises.length)]

          exercisesData.push({
            calories: caloriesPerExercise,
            exercises: exercise,
            time: timePerExercise,
          })
        }
      }

      daily.push({
        day: i + 1,
        meals: {
          breakfast: {
            calories: breakfast.recipe.calories / breakfast.recipe.yield,
            recipe: breakfast,
          },
          lunch: {
            calories: lunch.recipe.calories / lunch.recipe.yield,
            recipe: lunch,
          },
          snack: {
            calories: snack.recipe.calories / snack.recipe.yield,
            recipe: snack,
          },
          dinner: {
            calories: dinner.recipe.calories / dinner.recipe.yield,
            recipe: dinner,
          },
        },
        exercises: exercisesData,
      })
    }

    const result: IMealPlanner = {
      bmr,
      dailyCaloriesBurn: dailyCaloriesToBurn,
      dailyCaloriesIntake,
      time: timeDuration ? Number(timeDuration) : 1,
      weightChange: weightChange ? Number(weightChange) : 0,
      daily,
    }

    return result
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    }
  }
}

const getBMI = (
  req: Request,
  res: Response,
): {
  bmi: number
  status: BMILevel
} => {
  const { query } = req
  const { height, weight } = query

  const bmi = Number(weight) / ((Number(height) / 100) * (Number(height) / 100))

  return {
    bmi,
    status:
      bmi < 18.5
        ? BMILevel.Underweight
        : bmi < 25
        ? BMILevel.Normal
        : bmi < 30
        ? BMILevel.GainWeight
        : bmi < 35
        ? BMILevel.ObeseLevel1
        : bmi < 40
        ? BMILevel.ObeseLevel2
        : BMILevel.ObeseLevel3,
  }
}

const getBMR = (req: Request, res: Response): number => {
  const { query } = req
  const { height, weight, age } = query

  const gender = query.gender as Gender

  const bmr = calculateBMR({
    age: Number(age),
    height: Number(height),
    weight: Number(weight),
    gender,
  })

  return bmr
}

export { getMealPlaner, getBMI, getBMR }
