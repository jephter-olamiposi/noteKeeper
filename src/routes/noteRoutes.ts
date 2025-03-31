import { Router } from 'express'
import * as noteController from '../controllers/noteController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

router.post('/', noteController.create)
router.get('/', noteController.getAll)
router.get('/:id', noteController.getOne)
router.put('/:id', noteController.update)
router.delete('/:id', noteController.remove)

export default router