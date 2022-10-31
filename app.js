require('dotenv').config();
const express = require("express");
const app = express();
const routes = require('./index');

//################################
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//################################


app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("서버를 가동합니다");
  });
