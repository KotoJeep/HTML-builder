const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathFolderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(pathFolderCopy, {recursive: true}, ()=>{});
fs.readdir(pathFolder, {withFileTypes: true}, (err, files)=>{
  if (err){
    console.log(err);
  }
  files.forEach(file=>{
    const pathFile = path.join(pathFolder, file.name);
    const pathFileCopy = path.join(pathFolderCopy, file.name);
    
    fs.copyFile(pathFile, pathFileCopy, (err)=>{
      if (err){
        console.log(err);
      }
    });
  });
  
});
