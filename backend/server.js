require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config');
const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGINS,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Swagosaur backend running' });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
