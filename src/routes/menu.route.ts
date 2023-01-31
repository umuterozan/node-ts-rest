import { Router } from 'express';
import { insertSchema, updateSchema } from '../validators/menu.validator';
import Validator from '../middlewares/Validator';

import { getAll, insert, remove, update } from '../controllers/menu.controller';

const router = Router();

router.post('/add', Validator(insertSchema), insert);
router.delete('/', remove);
router.put('/', Validator(updateSchema), update);
router.get('/', getAll);

export default router;
