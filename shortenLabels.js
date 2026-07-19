const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'app', 'constants', 'labels-en.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/'Find Famous Local Food'/g, "'Local Food'");
content = content.replace(/'Plan My Evening'/g, "'Evening Plan'");
content = content.replace(/'Hidden Gems Nearby'/g, "'Hidden Gems'");

fs.writeFileSync(file, content);
console.log('Shortened labels in English.');
