import { type Request, type Response } from 'express'
import config from '../../config'
import {
  type IRecipe,
  type IRecipes,
  type IRecipesRequestParams,
  type TCuisineType,
  type TDiet,
  type TDishType,
  type THealth,
  type TMealType,
} from '@hienpham512/smarteats'
import axios from 'axios'
import { getNextPageParam } from './helper'

const apiKey = config.services.recipes.apiKey
const apiId = config.services.recipes.apiId

const getRecipes = async (
  req: Request,
  res: Response,
): Promise<
  | IRecipes
  | {
      error: {
        code: string
        message: string
        status: number
      }
    }
> => {
  const { query } = req

  // const pattern = /^\d+(?:-\d+)?$|^\d+\+$/

  const q = query.q as string
  const health = query.health as THealth
  const cuisineType = query.cuisineType as TCuisineType
  const diet = query.diet as TDiet
  const mealType = query.mealType as TMealType
  const dishType = query.dishType as TDishType
  const calories = query.calories as string
  const time = query.time as string
  const excluded = query.excluded ? JSON.parse(query.excluded as string) : undefined
  const nextPage = query.nextPage as string

  const params: IRecipesRequestParams = {
    _cont: nextPage,
    calories,
    cuisineType,
    diet,
    dishType,
    excluded,
    health,
    mealType,
    q,
    time,
  }
  const baseUrl = `${config.services.recipes.url}?type=public&app_id=${apiId}&app_key=${apiKey}`

  try {
    const response = await axios.get(baseUrl, { params })
    const result: IRecipes = {
      count: response.data.count,
      from: response.data.from,
      hits: response.data.hits.map((hit: IRecipe) => ({ ...hit.recipe, _links: null })),
      nextPage: response.data._links.next.href
        ? getNextPageParam(response.data._links.next.href)
        : null,
      to: response.data.to,
    }
    return result
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
        status: error.config.status,
      },
    }
  }
}

const getDetailsRecipe = async (
  req: Request,
  res: Response,
): Promise<
  | IRecipe
  | {
      error: {
        code: string
        message: string
        status: number
      }
    }
> => {
  try {
    const { id } = req.params

    const baseUrl = `${config.services.recipes.url}/${id}?type=public&app_id=${apiId}&app_key=${apiKey}`

    const response = await axios.get(`${baseUrl}`)
    return { ...response.data, _links: null }
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
        status: error.config.status,
      },
    }
  }
}
export { getRecipes, getDetailsRecipe }
