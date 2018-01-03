const fs = require('fs');
const process = require('process');

class File {
    constructor(fileName, content) {
        this.fileName = fileName;
        this.content = content;
    }
}

function readOneFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(new File(fileName, data));
        });
    })
}

function encodeOneFile(file) {
    const data = file.content;
    for (let i = 1; i < data.length; i++) {
        if (data[i] > 65 && data[i] < 122) {
            data[i] = ((data[i] - 65) + 1) % 57 + 65;
        }
    }
    return file; 
}

function encode(files) {
    const ps = [];
    for (const f of files) {
        ps.push(new Promise((resolve) => {
            resolve(encodeOneFile(f));
        }));
    }
    return Promise.all(ps);
}

function writeOneFile(file) {
    const opts = {
        encoding: 'binary',
    };
    return new Promise((resolve, reject) => {
        fs.writeFile(file.fileName + ".titkos", file.content, opts, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
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

Promise.all(filePromises)
    .then(encode)
    .then(write)
    .catch((reason) => {
        console.error("Bumm: ", reason);
    })
