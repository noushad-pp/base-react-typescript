const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  router = express.Router();

const jsonFile = (filename, wait = 0) => async (request, response) => {
  await new Promise((resolve) => setTimeout(() => resolve(), wait));
  response.set('Content-Type', 'application/json');
  response.writeHead(200, 'OK');
  fs.createReadStream(filename).pipe(response);
};

const app = express();

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', request.headers.origin);
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/', (request, response) => {
  response.send('Mock API');
});

router.get('/portfolios', jsonFile('./mock-api/responses/portfolios.json', 200));

app.use(bodyParser.json()); // for parsing application/json
app.use(router);
const listener = app.listen(5000, () => console.info(`Running on port ${listener.address().port}`));
