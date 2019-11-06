const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const PinoLogger = require('pino')
const bodyParser = require('body-parser')
const queryString = require('querystring')

const proxyHost = 'http://ind-gigw-mng:3000' // docker port
// const proxyHost = 'http://172.16.0.30:32004' // 用于代理的   ip + host

const csProxyHost = 'http://ind-gicollect:3000' // 旧产品催收系统的docker port
// const csProxyHost = 'http://172.16.0.30:32011' // 用于代理的   ip + host

const ncsProxyHost = 'http://ind-gcollection:3000' // 新产品催收系统的docker port
// const ncsProxyHost = 'http://172.16.0.30:32012'

const nImgAsset = 'http://fastdfs:8080'  // 新产品文件服务器的docker port
// const nImgAsset = 'http://172.16.0.30:30000'


const pino = PinoLogger({
  prettyPrint: {
    translateTime: true,
    messageKey: 'method',
    ignore: 'pid,hostname'
  }
})

const app = express()

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '..', 'build')))

app.use(
  '/api/v1',
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

// 代理到催收系统(由于催收系统重构 不走网关 由前端执行代理)
app.use(
  '/collect',
  proxy({
    target: csProxyHost,
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
)

app.use(
  '/ncollect',
  proxy({
    target: ncsProxyHost,
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
    },
    pathRewrite:{
      '^/ncollect':"/collect"
    }
  })
)


app.use('/assert', proxy({ target: proxyHost })) // 图片资源代理到网关

app.use('/appbackend', proxy({ target: nImgAsset })) // 图片资源代理到网关

app.use('/assert_call', proxy({ target: proxyHost })) // 图片资源录音资源代理到网关
app.use('/group1', proxy({ target: proxyHost })) // 图片资源代理到网关

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
// todo
