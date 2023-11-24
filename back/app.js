const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
const dataMiddleware = require('./data/route')
const usersMiddleware = require('./users/route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000" }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

app.use("/users", usersMiddleware.routes)
app.use("/data", dataMiddleware.routes)

app.get('/', function (req, res) {
  res.send('app started')
})

app.listen(port, () => {
    console.log(`--> request on ${port}`)
  })
