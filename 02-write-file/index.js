const fs = require('fs');
const stdout = process.stdout;
const stdin = process.stdin;
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile);

stdout.write('Введите текст:\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Ввод завершен\n');
    process.exit();
  } else {
    output.write(data);
    stdout.write('следуюшая строка:\n');
  }
  
});
process.on('SIGINT',  ()=> {
  stdout.write('\nВвод завершен');
  process.exit();
});

