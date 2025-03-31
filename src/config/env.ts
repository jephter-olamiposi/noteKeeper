import dotenv from 'dotenv'
dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
export const DATABASE_URL = process.env.DATABASE_URL
