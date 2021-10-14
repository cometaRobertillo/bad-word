const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./src/router');

dotenv.config();

app.use(bodyParser());

router(app);

app.listen(process.env.PORT);