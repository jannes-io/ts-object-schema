const shell = require('shelljs');

shell.rm('-rf', './dist/*');
shell.exec('tsc');
shell.cp('-r', './src/Assets', './dist/Assets');
shell.cp('-r', './dist_files/*', './dist');
