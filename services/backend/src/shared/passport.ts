import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as memberRepository from '../routes/member/repository';
import CONFIG from './config';
import bcrypy from 'bcrypt';
import { RequestHandler } from 'express';

passport.use(
  new LocalStrategy(
    {
      usernameField: CONFIG.PASSPORT_USERNAME_FIELD,
      passwordField: CONFIG.PASSPORT_PASSWORD_FIELD,
    },
    async (email, password, done) => {
      try {
        const result = await memberRepository.findByEmail(email);
        const user = result[0];

        if (!user) throw new Error('유저가 존재하지 않습니다.');

        const match = await bcrypy.compare(password, user.password);

        if (!match) throw new Error('부정확한 이메일/패스워드입니다.');

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user);
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await memberRepository.findById(id);
    const user = result[0];

    if (!user) throw Error('유저를 찾을 수 없습니다.');

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const ensureAuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.status(401).json({ message: '로그인이 필요합니다.' });
};

export { passport, ensureAuthMiddleware };
