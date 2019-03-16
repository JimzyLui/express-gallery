const express = require('express');
const bodyParser = require('body-parser');
const User = require('./resources/database/models/User');
const Photo = require('./resources/database/models/Photo');

//data const
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if(!PORT) { console.log('No Port Found!');}
if(!SESSION_SECRET) { console.log('No Session Secret Found!');}
if(!REDIS_HOSTNAME) { console.log('No Redis Hostname Found!');}
if(!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) { return process.exit(1); }

const app = express();
app.use(bodyParser.json({extended:true}));

//start server
app.listen(PORT, ()=>{
    console.log(`Listening on PORT  + ${PORT}`);
})