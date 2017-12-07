const process = require('process');
const fs = require('fs');

function titkosit(num) {
    if (num < 65 || num > 122) return num;
    return ((num - 65) + 1) % 57 + 65;
}

const fd = fs.openSync(process.argv[2], 'r');

while (true) {
    const buf = new Uint8Array(1);
    const bytesRead = fs.readSync(fd, buf, 0, 1, null);
    if (bytesRead <= 0) {
	break;
    }
    const t = titkosit(buf[0]);
    const outBuf = Buffer.from([t]);
    process.stdout.write(outBuf.toString('binary'));
}

