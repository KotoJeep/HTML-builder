const fs = require('fs');
const path = require('path');
const pathProject = path.join(__dirname, 'project-dist');
const pathCopyAssets = path.join(__dirname, 'project-dist/aseets');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathHtml = path.join(__dirname, 'project-dist/index.html');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');
const pathBundleStyles = path.join(__dirname, 'project-dist/style.css');

//create dist folder
fs.mkdir(pathProject, {recursive: true}, (err) => {
  console.log(err);
});
fs.copyFile(pathTemplate, pathHtml, err => {
  if (err) console.log(err);
});

// copy assets
function copyFiles(pathFolder, pathCopy) {
  fs.mkdir(pathCopy, {recursive: true}, (err) => {
    console.log(err);
  });
  fs.readdir(pathFolder, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      if (file.isFile()) {
        fs.copyFile(path.join(pathFolder, file.name), path.join(pathCopy, file.name), (err) => {
          if (err) console.log(err);
        });
      } else {
        copyFiles(path.join(pathFolder, file.name), path.join(pathCopy, file.name));
      }
    });
  });
}

copyFiles(pathAssets, pathCopyAssets);

//merge styles
fs.readdir(pathStyles, (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    fs.readFile(path.join(pathStyles, file), 'utf8', (err, data) => {
      if (err) console.log(err);
      fs.appendFile(pathBundleStyles, data, err => {
        if (err) console.log(err);
      });
    });
  });
});

//create html
fs.readFile(pathHtml, (err, data) => { //reading html
  if (err) console.log(err);
  console.log(data);
  fs.readdir(pathComponents, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      
      let pathFile = path.join(pathComponents, file.name);
      fs.stat(pathFile, () => {
        let name = path.basename(pathFile, path.extname(pathFile));
        console.log(name);
        // data = data.replace(`{{${name}}`, file);
        // fs.writeFile(pathHtml, data, (err) => {
        //   if (err) console.log(err);
        // });
      });
      
      // fs.readFile(path.join(pathComponents, file), 'utf8', (err, component) => {
      //   if (err) console.log(err);
      // });
      
    });
  });
});
