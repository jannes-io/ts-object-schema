const shell = require('shelljs');

shell.rm('-rf', './dist/*');
shell.exec('tsc');
shell.cp('-r', './dist_files/*', './dist');
