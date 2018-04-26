
Object.unflatten = function(data) {
  "use strict";
  if (Object(data) !== data || Array.isArray(data))
    return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (var p in data) {
    var cur = resultholder,
      prop = "",
      m;
    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
};

Object.flatten = function(data) {
  var result = {};
  function recurse (cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for(var i=0, l=cur.length; i<l; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop+"."+p : p);
      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

const http = require('http');
const express = require('express');

const db = require('./conn/sqldb');

const app = express();
app.use((req, res, next) => {
  console.log('request');
  next()
})
require('./config/express')(app)

const {
    host,
    port,
} = {
    host: '0.0.0.0',
    port: 1587,
};

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`\n##########################`);
    console.log(`## MailQ: Amazon SES Compatible ##`)
    console.log(`##########################\n`);
    console.log(`Running at http://${host}:${port}\n`);
});

module.exports = app;
