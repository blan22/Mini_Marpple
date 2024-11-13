import express from 'express';
import * as memberController from './controller';
import { passport } from '../../shared/passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), memberController.login);

export default router;
