const util = require('util');

function dump(val) {
    return util.inspect(val, {customInspect: false, showHidden: true, depth: null, colors: true});
}


const x = {
    alma: 1,
    korte: 2,
};

console.log("*** x:", dump(x));

const xProto = Object.getPrototypeOf(x);
console.log("*** Az x prototipusa:", dump(xProto));

function Valami() {
    this.adat = 3;
}

Valami.prototype.kiirato = function() {
    console.log("adat:", this.adat);
}

const v = new Valami();
console.log("*** v:", dump(v));

const vProto = Object.getPrototypeOf(v);
console.log("*** A v prototipusa:", dump(vProto));
