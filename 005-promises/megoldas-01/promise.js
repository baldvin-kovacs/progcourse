fs = require('fs');
process = require('process');

class SimplePromise {
    constructor(f) {
        this.rejected = false;
        this.result = null;
        this.done = false;
        this.rejected = false;
        this.f = f;
        this.next = null;

        const resolve = (result) => {
            this.result = result;
            this.done = true;
            if (this.next) {
                this.next();
            }
        };

        const reject = (error) => {
            this.result = error;
            this.failed = true;
            this.done = true;
            if (this.next) {
                this.next();
            }
        };

        const execute = () => {
            f(resolve, reject);
        };

        setTimeout(execute, 0);
    }

    then(f) {
        return new SimplePromise((resolve, reject) => {
            const doit = () => {
                if (this.failed) {
                    reject(this.result);
                    return;
                }
                try {
                    const result = f(this.result);
                    resolve(result);
                } catch (e) {
                    console.error(e);
                    reject(e);
                }
            };
            if (!this.done) {
                this.next = doit;
                return;
            }
            doit();
        });
    }
}

function addOne(x) {
    return x + 1;
}

function double(x) {
    return x * 2;
}

function printTheResult(x) {
    console.log(x);
}

const p = new SimplePromise((resolve, reject) => {
    resolve(parseInt(process.argv[2]));
    return;
})

p.then(addOne)
 .then(double)
 .then(printTheResult);
