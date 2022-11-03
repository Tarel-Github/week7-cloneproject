require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const HTTPS = require('https');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');
const routes = require('./index');

app.use(cors({ origin: '*', credential: 'true' }));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger);
app.use(errorHandler);

try {
  const option = {
    ca: fs.readFileSync(
      '/etc/letsencrypt/live/tonkotsu-ramen.site/fullchain.pem'
    ),
    key: fs.readFileSync(
      '/etc/letsencrypt/live/tonkotsu-ramen.site/privkey.pem'
    ),
    cert: fs.readFileSync('/etc/letsencrypt/live/tonkotsu-ramen.site/cert.pem'),
  };

  HTTPS.createServer(option, app).listen(port, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}
