const fs = require('fs');
const path = require('path');
const pathStyles = path.join(__dirname, 'styles');
const pathBundle = path.join(__dirname, 'project-dist/bundle.css');

fs.readdir(pathStyles, (err, files)=>{
  if (err) {
    console.log(err);
  }
  files.forEach(file=>{
    if(path.extname(file)=== '.css'){
      fs.readFile(path.join(pathStyles, file), 'utf8', (err,data)=>{
        if (err) console.log( err);
        fs.appendFile(pathBundle, data, ()=>{});
      });
    }
  });
});
