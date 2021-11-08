const fs = require('fs');
const path = require('path');
const pathProject = path.join(__dirname, 'project-dist');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');

fs.mkdir(pathProject, {recursive: true}, (err) => {
  console.log(err);
});
