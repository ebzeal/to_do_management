import express from 'express';
import env from 'dotenv';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

env.config();

app.use('/api/v1', routes);

const port = process.env.PORT;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
