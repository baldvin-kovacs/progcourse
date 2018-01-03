async function a() {
    return 42;
}

async function b(x) {
    return 2 * x;
}

async function c() {
    const ra = await a();
    const rb = await b(ra);
    return rb;
}

c().then(console.log);
