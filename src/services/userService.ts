import db from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

interface UserInput {
  first_name: string
  last_name: string
  email: string
  password: string
}

export const registerUser = async (data: UserInput) => {
  const existingUser = await db('users').where({ email: data.email }).first()
  if (existingUser) return { status: 409, message: 'User already exists' }

  const hashed = await bcrypt.hash(data.password, 10)

  await db('users').insert({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    passwords: hashed,
  })

  return { status: 201, message: 'User registered successfully' }
}

export const loginUser = async (email: string, password: string) => {
  const user = await db('users').where({ email }).first()
  if (!user) return { status: 404, data: { message: 'User not found' } }

  const match = await bcrypt.compare(password, user.passwords)
  if (!match) return { status: 401, data: { message: 'Invalid credentials' } }

  const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET!, {
    expiresIn: '1h',
  })

  return {
    status: 200,
    data: {
      message: 'Login successful',
      token,
    },
  }
}

export const updateUser = async (user_id: number, updates: Partial<UserInput>) => {
  await db('users').where({ user_id }).update(updates)
  return { status: 200, message: 'User updated successfully' }
}

export const deleteUser = async (user_id: number) => {
  await db('users').where({ user_id }).del()
}
