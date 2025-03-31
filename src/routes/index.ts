import {Router} from 'express';
import {user} from '../controllers/userController';

const router = Router();

router.get('/user', user);
export default router;