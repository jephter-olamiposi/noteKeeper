import db from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'
import { RegisterInput } from '../utils/validators'

export const registerUser = async (data: RegisterInput) => {
  const existing = await db('users').where({ email: data.email }).first()
  if (existing) return { status: 409, message: 'User already exists' }

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

  const valid = await bcrypt.compare(password, user.passwords)
  if (!valid) return { status: 401, data: { message: 'Invalid credentials' } }

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

export const updateUser = async (userId: number, updates: Partial<RegisterInput>) => {
  await db('users').where({ user_id: userId }).update(updates)
  return { status: 200, message: 'User updated successfully' }
}

export const deleteUser = async (userId: number) => {
  await db('users').where({ user_id: userId }).del()
}
