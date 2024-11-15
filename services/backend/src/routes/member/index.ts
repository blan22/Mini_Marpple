import express from 'express';
import * as memberController from './controller';
import { passport } from '../../shared/passport';

const router = express.Router();

router.route('/').get(memberController.getSession);

router.route('/login').post(passport.authenticate('local'), memberController.login);

export default router;
