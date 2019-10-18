//imports
const express = require('express')
const app = require('express')()
const path = require('path')
const consign = require('consign')
const fs = require('fs')
const hash = require('hash-generator')
const { dbSysQuality, dbVirtuante } = require('./config/db')
const SSE = require('express-sse')
const static = path.join(__dirname, 'static');

app.sse = new SSE("Conectado")
app.dbSysQuality = dbSysQuality
app.db = dbSysQuality 
app.dbVirtuante = dbVirtuante
app.fs = fs 
app.hash = hash 
app.set('view engine', 'hbs') 

app.use('/static', express.static(static));

consign() 
    .include('./config/middlewares.js') 
    .then('./api/validation.js')
    .then('./api') 
    .then('./config/routes.js') 
    .then('./config/boot.js')
    .into(app)
