 // Imported required packages
 const express = require('express'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 mongoose = require('mongoose');
 
 
 // MongoDB Databse url
 var mongoDatabase = 'mongodb://localhost:27017/clips';
 
 // Created express server
 const app = express();
 mongoose.Promise = global.Promise;
 
 // Connect Mongodb Database                                                  
 mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
 () => { console.log('Database is connected') },
 err => { console.log('There is problem while connecting database ' + err) }
 );
 
 
 // Conver incoming data to JSON format
 app.use(bodyParser.json());
 
 // Enabled CORS
 app.use(cors());

 const routes=require('./routes/Index');
 app.use('/',routes);
 // Setup for the server port number
 const port = process.env.PORT || 5000;
 
 // Staring our express server
 const server = app.listen(port, function () {
    console.log('Server Lisening On Port : ' + port);
    });