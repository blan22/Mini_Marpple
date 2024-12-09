import express from 'express';
import * as memberController from './controller';
import { passport } from '../../shared/passport';
import { errorBoundary } from '../../shared/error';

const router = express.Router();

router.route('/').get(errorBoundary(memberController.getSession));

router.route('/login').post(passport.authenticate('local'), errorBoundary(memberController.login));

export default router;
