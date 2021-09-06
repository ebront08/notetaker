// uses express to interact with the front end
const express = require('express');
// finds path for filename paths
const path = require('path');
const dataBase = require('./db');
// fs reads and writes to files
const fs = require('fs');
// initial port for app listeners
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));