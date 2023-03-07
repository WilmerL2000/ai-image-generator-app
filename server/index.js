import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

/* Creating an instance of the express server. */
const app = express();
/* Allowing the server to accept requests from other domains. */
app.use(cors());
/* Setting the limit of the data that can be sent to the server. */
app.use(express.json({ limit: '50mb' }));

/* Telling the server to use the postRoutes file when the url is /api/v1/post. */
//API ENDPOINTS
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('hello world');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server has started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
