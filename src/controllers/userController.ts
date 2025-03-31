import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { registerSchema, loginSchema } from '../utils/validators'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
    return
  }

  try {
    const result = await userService.registerUser(parsed.data)
    res.status(result.status).json({ message: result.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
    return
  }

  try {
    const result = await userService.loginUser(parsed.data.email, parsed.data.password)
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
