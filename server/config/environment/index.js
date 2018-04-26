const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const root = path.normalize(`${__dirname}/../../..`);

if(!fs.existsSync(path.join(getUserHome(), '.emailq'))) {
  fs.writeFileSync(path.join(getUserHome(), '.emailq'))
}

const env = dotenv.config({ path: path.join(getUserHome(), '.emailq') });

const config = {
  all: {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    ip: process.env.IP || '0.0.0.0',
    root,
  },
  development: {

  },

  staging: {

  },

  production: {

  },
};

const conf = Object.assign(env.parsed, config.all,  config[process.env.NODE_ENV || 'development']);

module.exports = conf;
