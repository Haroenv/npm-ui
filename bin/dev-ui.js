#!/usr/bin/env node

const micro = require('micro');
const getPort = require('get-port');
const opener = require('opener');
const app = require('..');
getPort().then(port => {
  micro(app).listen(port);
  console.log(`opened at http://127.0.0.1:${port}`);
  opener(`http://127.0.0.1:${port}`);
});
