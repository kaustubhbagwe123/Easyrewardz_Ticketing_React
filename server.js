const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')
const { createReadStream } = require('fs');

const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      if (pathname === './src/index.js') {
        const filePath = join(__dirname, 'static', pathname);
        console.log("New pathname is: " + filePath);
        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
