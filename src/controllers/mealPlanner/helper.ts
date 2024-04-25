import {
  ActivityLevel,
  Gender,
  type IMealPlan,
  type IMealPlanRequestParams,
} from '@hienpham512/smarteats'

export const calculateBMI = ({ weight, height }: { weight: number; height: number }): number => {
  return weight / (height * height)
}

export const calculateBMR = ({
  weight,
  height,
  age,
  gender,
}: {
  weight: number
  height: number
  age: number
  gender: Gender
}): number => {
  if (gender === Gender.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

export const calculateCaloriesIntakeAndBurn = (
  params: IMealPlanRequestParams,
  activityLevel: ActivityLevel = ActivityLevel.NotActive,
): { dailyCaloriesIntake: number; dailyCaloriesToBurn: number } => {
  const dailyCalories = calculateBMR(params)

  const { weightChange } = params

  let burn = 0
  let intake = dailyCalories

  if (weightChange && weightChange !== 0) {
    const weightChangePerDay =
      weightChange > 0 ? activityLevel * (0.003125 / 7) * params.weight : 0.1 / activityLevel

    if (weightChange > 0) {
      intake += weightChangePerDay * 7700 * (Math.floor(Math.random() * 0.8) + 0.5)
      burn += weightChangePerDay * 7700 * (Math.floor(Math.random() * 0.3) + 0.2)
    } else {
      intake -= weightChangePerDay * 7700 * (Math.floor(Math.random() * 0.3) + 0.2)
      burn += weightChangePerDay * 7700 * (Math.floor(Math.random() * 0.8) + 0.5)
    }
  } else {
    intake += (activityLevel - 1) * params.weight * 7700
    burn += (activityLevel - 1) * params.weight * 7700
  }

  return {
    dailyCaloriesIntake: intake,
    dailyCaloriesToBurn: burn,
  }
}

export const calculateDailyCalories = (bmr: number, age: number, gender: Gender): number => {
  let activityMultiplier: number

  // Define activity multipliers based on gender and activity level
  if (gender === Gender.Male) {
    activityMultiplier = 1.55 // Moderate activity level for males
  } else {
    activityMultiplier = 1.56 // Moderate activity level for females
  }

  // Adjust activity multiplier based on age
  if (age >= 18 && age <= 30) {
    activityMultiplier += 0.1 // Young adults have slightly higher activity levels
  } else if (age > 30 && age <= 60) {
    activityMultiplier += 0.05 // Middle-aged adults have slightly lower activity levels
  } // For simplicity, we are not considering age-based adjustments for other age groups

  return bmr * activityMultiplier
}

// Enum definitions for Gender and GoalType here

export const calculateDailyCaloriesToBurn = (
  params: IMealPlanRequestParams,
  dailyCaloriesIntake: number,
): number => {
  const targetWeightLossKg = Math.abs(params.weightChange ?? 0) // Target weight loss in kilograms
  const caloriesPerKg = 7700 // Calories per kilogram of weight loss

  // Calculate total calorie deficit required to achieve target weight loss in a month
  const totalCalorieDeficit = targetWeightLossKg * caloriesPerKg

  // Calculate daily calorie deficit needed
  const dailyCalorieDeficit =
    totalCalorieDeficit / (params.timeDuration ? params.timeDuration * 7 : 7)

  // Calculate daily calories to burn to achieve the deficit
  const dailyCaloriesToBurn = dailyCaloriesIntake - dailyCalorieDeficit

  return dailyCaloriesToBurn
}

export const calculateCustomMealCalories = (dailyCalories: number): IMealPlan => {
  // Assuming a standard distribution of calories among meals
  const breakfastRatio = 0.25
  const lunchRatio = 0.4
  const dinnerRatio = 0.35
  const snackRatio = 0.1

  const breakfast = dailyCalories * breakfastRatio
  const lunch = dailyCalories * lunchRatio
  const dinner = dailyCalories * dinnerRatio
  const snack = dailyCalories * snackRatio

  return {
    breakfast,
    lunch,
    dinner,
    snack,
  }
}
