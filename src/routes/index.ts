import { Router } from 'express'
import userRoutes from './userRoutes'
import noteRoutes from './noteRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/notes', noteRoutes)

export default router