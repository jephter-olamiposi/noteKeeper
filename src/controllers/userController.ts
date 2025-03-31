import { Request, Response } from 'express'
import * as userService from '../services/userService'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ message: 'All fields are required' })
    return
  }

  try {
    const result = await userService.registerUser({ first_name, last_name, email, password })
    res.status(result.status).json({ message: result.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }

  try {
    const result = await userService.loginUser(email, password)
    res.status(result.status).json(result.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const result = await userService.updateUser(userId, req.body)
    res.status(result.status).json({ message: result.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    await userService.deleteUser(userId)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
