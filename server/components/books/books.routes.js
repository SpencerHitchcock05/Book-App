import { Router } from 'express';
import * as controller from './books.controller.js'
import { checkAuth } from '../auth/auth.controller.js';

const router = Router();

router.route('/getBooks').post(controller.getBooks);
router.route('/addUserBooks').post(controller.addUserBooks)
router.route('/getUserBooks').get(controller.getUserBooks)

export default router