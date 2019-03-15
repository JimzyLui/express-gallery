const express = require('express');
const bodyParser = require('body-parser');
const Photos = require('./database/models/Photos');

//data consts
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if(!PORT) { console.log('No Port Found!');}
if(!SESSION_SECRET) { console.log('No Session Secret Found!');}
if(!REDIS_HOSTNAME) { console.log('No Redis Hostname Found!');}
if(!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) { return process.exit(1); }