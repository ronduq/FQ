const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// App will get the Azure port from the process.enc.PORT
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/:location/retailers/:retailer?', (req, res) => {
      const { retailer } = req.params;
      const page = retailer ? '/retailer-profile' : '/overallrank';
      return app.render(req, res, page, { ...req.params, ...req.query})
    });

    server.get('/:location/retailers/:retailer/trends', (req, res) => {
      return app.render(req, res, '/retailer-trends', { ...req.params, ...req.query})
    });

    server.get('/:location/produce/:produce/trends', (req, res) => {
      return app.render(req, res, '/produce-trends', { ...req.params, ...req.query})
    });

    server.get('/:location/produce', (req, res) => {
      return app.render(req, res, '/produce-basket', { ...req.params, ...req.query})
    });

    server.get('/:location/produce/:produce/:retailer/', (req, res) => {
      return app.render(req, res, '/produce-profile', { ...req.params, ...req.query})
    });

    server.get('/:location/produce/best-picks', (req, res) => {
      return app.render(req, res, '/best-picks', { ...req.params, ...req.query})
    });

    server.get('/subscribe', (req, res) => {
      return app.render(req, res, '/subscribe', req.params)
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  });
  