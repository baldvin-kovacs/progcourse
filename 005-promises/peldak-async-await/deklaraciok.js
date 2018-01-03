async function printHello() {
    console.log('Hello');
    return 42;
}

printHello().then(console.log);


async function printBoth() {
    const x = await printHello();
    console.log(x);
    return 'mindkettőt kiírtam'
}

printBoth().then(console.log);


const printSomething = async (v) => {console.log(v)};

printSomething('something');
