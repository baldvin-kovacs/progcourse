import {openSync, readSync} from 'fs';
import {argv, stdout} from 'process';

function titkosit(num: number): number {
    if (num < 65 || num > 122) return num;
    return ((num - 65) + 1) % 57 + 65;
}

const fd = openSync(argv[2], 'r');

while (true) {
    const buf = new Uint8Array(1);
    const bytesRead = readSync(fd, buf, 0, 1, null);
    if (bytesRead <= 0) {
	break;
    }
    const t = titkosit(buf[0]);
    const outBuf = Buffer.from([t]);
    stdout.write(outBuf.toString('binary'));
}
