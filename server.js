// require
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

// routes
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

// initialization 
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public')); 

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// open server PORT
app.listen(PORT, () => console.log(`listening on PORT ${PORT} :)`));
