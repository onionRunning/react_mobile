/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const PinoLogger = require('pino')
const bodyParser = require('body-parser')
const queryString = require('querystring')
const axios =require('axios');
// const compression = require('compression')

const proxyHost = 'https://api.haowande.com/' // docker port
const pino = PinoLogger({
  prettyPrint: {
    translateTime: true,
    messageKey: 'method',
    ignore: 'pid,hostname'
  }
})
const app = express()
// app.use(compression())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/chengyu/configuration', async function(req,res,next){
  const rx = await axios.get('https://api.haowande.com/chengyu/configuration')
  // console.log(rx.data, 'res')
  res.send(rx.data)
  // next()
})

app.get('/*', function(req, res) {
  // console.log(req, 'err')
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
// todo
