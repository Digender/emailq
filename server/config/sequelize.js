const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const pkg = require('../../package.json');

const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');
let config = {};

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

if (fs.existsSync(envFile)) {
  const env = dotenv.config({ path: envFile });
  config = env.parsed || env;
} else {
  console.log(`.emailq file not found.
  Learn more at check installation docs at https://github.com/manjeshpv/emailq/blob/${pkg.version}/docs/Installation.md
  Trying to connect with default settings.
  `);
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const settings = {
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || path.join(getUserHome(), 'emailq.sqlite'),
  seederStorage: 'sequelize',
};

module.exports = {
  development: settings,
  production: settings,
};
