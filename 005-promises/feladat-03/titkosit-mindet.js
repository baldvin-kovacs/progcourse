const fs = require('fs');
const process = require('process');

class File {
    constructor(fileName, content) {
        this.fileName = fileName;
        this.content = content;
    }
}

function readOneFile(fileName) {
  // Ez adjon vissza egy promise-t, ami egy File példányra rezolválódik.
}

function encodeOneFile(file) {
    const data = file.content;
    for (let i = 1; i < data.length; i++) {
        if (data[i] > 65 && data[i] < 122) {
            data[i] = ((data[i] - 65) + 1) % 57 + 65;
        }
    }
}

function encode(files) {
    const ps = [];
    for (const f of files) {
        // A ps-be push-oljunk egy-egy promise-t minden f-hez.
        // A promise futtassa az encodeOneFile-t, és rezolválódjon
        // magára az f-re.
    }
    return Promise.all(ps);
}

function writeOneFile(file) {
    const opts = {
        encoding: 'binary',
    };
    // Adjunk vissza egy új Promise-t, ami az fs.writeFile-t használja
    // a titkos fájl kiírásához.
}

function write(files) {
    const ps = [];
    for (const f of files) {
        ps.push(writeOneFile(f));
    }
    return Promise.all(ps);    
}

const filePromises = [];
for (let i = 2; i < process.argv.length; i++) {
    filePromises.push(readOneFile(process.argv[i]));
}

// Használjuk a Promise.all-t a filePromises végrehajtásához,
// majd .then-ekkel hívjuk an encode-ot és a write-ot. Végül
// egy .catch-ben írjuk ki a hibaüzenetet, ha bármi hiba történt.
