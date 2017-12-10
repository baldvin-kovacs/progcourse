const fs = require('fs');
const process = require('process');

const tartalom = fs.readFileSync(process.argv[2], "utf8");
console.log("tartalom:", tartalom);

const parsed = JSON.parse(tartalom);
console.log("parsed:", parsed);

const keys = Object.keys(parsed);
console.log("mezők száma: ", keys.length);



