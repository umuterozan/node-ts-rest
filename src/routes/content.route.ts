import { Router } from 'express';
import { insert, get, remove, update } from '../controllers/content.controller';

const router = Router();

router.post('/add', insert);
router.get('/:slug', get);
router.delete('/', remove);
router.put('/', update);

export default router;
