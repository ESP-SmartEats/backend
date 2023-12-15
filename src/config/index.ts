import dotenv from 'dotenv'

dotenv.config()
const config = {
  services: {
    exercises: {
      apiKey: process.env.EXERCISE_DB_API_KEY,
      host: process.env.EXERCISE_DB_API_HOST ?? 'exercisedb.p.rapidapi.com',
      url: process.env.EXERCISE_DB_URL ?? 'https://exercisedb.p.rapidapi.com/exercises',
    },
    recipes: {
      url: process.env.EDAMAM_URL ?? 'https://api.edamam.com/api/recipes/v2',
      apiKey: process.env.EDAMAM_API_KEY,
      apiId: process.env.EDAMAM_API_ID,
    },
  },
  server: {
    port: Number(process.env.PORT) ?? 8080,
    IP: process.env.IP ?? 'localhost',
  },
}

export default config
