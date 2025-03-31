import { Router } from 'express'
import * as userController from '../controllers/userController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.put('/update', authenticate, userController.update)
router.delete('/delete', authenticate, userController.remove)

export default router