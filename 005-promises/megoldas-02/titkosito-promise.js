fs = require('fs');
process = require('process');

function writeTheFile(data) {
    process.stdout.write(data.toString('binary'));
}

function xorTheData(data) {
    for (let i = 1; i < data.length; i++) {
        if (data[i] > 65 && data[i] < 122) {
            data[i] = ((data[i] - 65) + 1) % 57 + 65;
        }
    }
    return data;
}

function readTheFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(process.argv[2], (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

readTheFile()
    .then(xorTheData)
    .then(writeTheFile);
