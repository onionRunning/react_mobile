/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const PinoLogger = require('pino')
const bodyParser = require('body-parser')
const queryString = require('querystring')
// const compression = require('compression')

const proxyHost = 'https://api.haowande.com' // docker port
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
app.use(
  '/chengyu',
  proxy({
    target: proxyHost,
    onProxyReq: (proxyReq, req) => {
      if (!req.body || !Object.keys(req.body).length) {
        return
      }

      var contentType = proxyReq.getHeader('Content-Type')
      var bodyData

      if (contentType === 'application/json') {
        bodyData = JSON.stringify(req.body)
      }

      if (contentType === 'application/x-www-form-urlencoded') {
        bodyData = queryString.stringify(req.body)
      }

      if (bodyData) {
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
      }
    },
    onProxyRes: (proxyRes, req) => {
      pino.info({
        method: req.method,
        url: req.url,
        query: req.query,
        reqBody: !req.url.includes('login') ? req.body : {},
        status: proxyRes.statusCode
      })
    }
  })
) // 代理http请求

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
// todo
