'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp(`.env`),
  appBuildES:  resolveApp(`es`),
  appBuildLib:  resolveApp(`lib`),
  appBuildDist:  resolveApp(`dist`),
  appIndexJs: resolveApp('src/index.ts'),
  appSCSS: resolveApp('scss'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};
