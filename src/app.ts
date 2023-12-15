import express from 'express'
import config from './config'
import router from './routes'
import specs from './swaggerOptions'
import swaggerUi from 'swagger-ui-express'

const app = express()
const port = config.server.port ?? 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(router)

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Express API!' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
