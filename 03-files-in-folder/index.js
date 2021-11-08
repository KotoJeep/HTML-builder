const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach(file => {
    let pathFile = path.join(pathFolder, file.name);
    fs.stat(pathFile, (err, stats) => {
      if (err) {
        console.log(err);
      }
      if (stats.isFile()) {
        const extension = path.extname(pathFile);
        const name = path.basename(pathFile, extension);
        const size = stats.size / 1000;
        console.log(`${name} - ${extension.slice(1)} - ${size}kb`);
      }
    });
  });
});

