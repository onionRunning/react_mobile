/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')
// const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const axios =require('axios');

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/chengyu/configuration', async function(req,res,next){
  const rx = await axios.get('https://api.haowande.com/chengyu/configuration')
  res.send(rx.data)
  // next()
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
// todo
