import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import CONFIG from './shared/config';
import { passport } from './shared/passport';
import router from './routes';
import { store } from './shared/redis';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(
  session({
    store,
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(router);

app.listen(CONFIG.PORT, () => {
  console.log(`api server is running on ${CONFIG.PORT}`);
});
