import express from 'express'
import routes from './routes'


const app = express()


app.use(express.json())

app.use('/api', routes) // All routes prefixed with /api

export default app
