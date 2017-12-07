const process = require('process');
const fs = require('fs');

function titkosit(num) {
    if (num < 65 || num > 122) return num;
    return ((num - 65) + 1) % 57 + 65;
}

function processOneChar(fd) {
    const buf = new Uint8Array(1);
    fs.read(fd, buf, 0, 1, null, (err, bytesRead, buffer) => {
	if (bytesRead <= 0) {
	    return;
	}
	const t = titkosit(buffer[0]);
	const outBuf = Buffer.from([t]);
	process.stdout.write(outBuf.toString('binary'));
	processOneChar(fd);
    });
}

fs.open(process.argv[2], 'r', (err, fd) => {
    if (err != null) {
	console.error(err);
	process.exit(1);
    }
    processOneChar(fd);
})

