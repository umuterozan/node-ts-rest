import { Router } from 'express';
import { login, register, token } from '../controllers/auth.controller';
import Validator from '../middlewares/Validator';
import { registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/register', Validator(registerSchema), register);
router.post('/login', Validator(registerSchema), login);
router.post('/token', token);

export default router;
