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
  if (err) console.log(err);
});


// copy assets
function copyFiles(pathFolder, pathCopy) {
  fs.mkdir(pathCopy, {recursive: true}, (err) => {
    if (err) console.log(err);
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
fs.unlink(pathBundleStyles, err=>{
  if (err) console.log(err);
});
fs.readdir(pathStyles, (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    fs.readFile(path.join(pathStyles, file),'utf-8',  (err, data) => {
      if (err) console.log(err);
      fs.appendFile(pathBundleStyles, data, err => {
        if (err) console.log(err);
      });
    });
  });
});

//create html
fs.copyFile(pathTemplate, pathHtml, err => {
  if (err) {
    console.log(err);
  } else {
    fs.readdir(pathComponents, (err, files) => {
      if (err) throw err;
      fs.readFile(pathHtml, 'utf-8', (err, data) => {
        if (err) throw err;
        else {
          files.forEach(file => {
            const name = path.basename(file, path.extname(file));
            // console.log(name);
            fs.readFile(`${pathComponents}/${file}`, 'utf-8', (err, component) => {
              if (err) {
                console.log(err);
              }
              data = data.replace(`{{${name}}}`, component);
              fs.writeFile(pathHtml, data, 'utf-8', (err) => {
                if (err) console.log(err);
              });
            });
          });
        }
      });
    });
  }
});
