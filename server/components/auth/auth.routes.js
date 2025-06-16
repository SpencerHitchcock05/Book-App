import { Router } from 'express';
import * as controller from '../controllers/authController.js';

const router = Router();

router.route('/register').post(controller.register);
router.route('/login').post(controller.login);
router.route('/logout').post(controller.logout);

export default router;
