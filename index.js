const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = require('./server/routes/api');
// app.get('/api/targets', apiRoutes.targets);


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'server', 'static', 'index.html'))
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
