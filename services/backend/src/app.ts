import express from 'express';
import cors from 'cors';
import CONFIG from './shared/config';
import router from './routes';

const app = express();

// middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// routes
app.use(router);

app.listen(CONFIG.PORT, () => {
  console.log(`api server is running on ${CONFIG.PORT}`);
});
