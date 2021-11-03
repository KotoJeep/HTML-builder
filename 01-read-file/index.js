const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathFile, 'utf8');

stream.on('data', (data)=>console.log(data));

