import dotenv from 'dotenv'

dotenv.config()
const config = {
  services: {
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
