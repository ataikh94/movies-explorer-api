require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./configs/generalConfig');
const { requestLogger } = require('./middlewares/logger');
const router = require('./routes');
const centralErrorHandler = require('./configs/centralErrorHandler');

const app = express();

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
