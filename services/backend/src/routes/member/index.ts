import express from 'express';
import * as memberController from './controller';
import { passport } from '../../shared/passport';

const router = express.Router();

router.get('/', memberController.getSession);

router.post('/login', passport.authenticate('local'), memberController.login);

export default router;
