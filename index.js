const express = require('express');
const db = require('./config/connection');
const api_routes = require('./controllers/api/api_routes');
const PORT = 3001;

const app = express();

app.use(express.json());

app.use('/api', api_routes);

Db.once('open', () => {
  app.listen(PORT, () => console.log('Server is running on port %s', PORT));
});