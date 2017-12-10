import {readFileSync} from 'fs';
import {argv} from 'process';

const tartalom = readFileSync(argv[2], "utf8");
console.log("tartalom:", tartalom);

const parsed = JSON.parse(tartalom);
console.log("parsed:", parsed);

const keys = Object.keys(parsed);
console.log("mezők száma: ", keys.length);
