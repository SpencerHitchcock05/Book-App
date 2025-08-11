import { Router } from 'express';
import * as controller from './books.controller.js'

const router = Router();

router.route('/getBooks').post(controller.getBooks);
router.route('/updateUserBooks').post(controller.updateUserBooks)

export default router