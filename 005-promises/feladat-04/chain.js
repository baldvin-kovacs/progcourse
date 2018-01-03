function a() {
    return 42;
}

function b(x) {
    return 2 * x;
}

function c() {
    return Promise.resolve().then(a).then(b);
}

c().then(console.log);
