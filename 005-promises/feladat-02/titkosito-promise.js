const fs = require('fs');
const process = require('process');

function writeTheFile(data) {
    // A "data" egy Buffer, amelyben a teljes kiírandó tartalom van.
    // Ez a függvény kétféle lehet: vagy szinkron módon kiírja a
    // tartalmat, vagy pedig készít egy Promise-t, amelyik majd
    // kiírja a tartalmat, és visszaadja ezt a Promise-t.
}

function xorTheData(data) {
    // Ezt megírhatjuk egyszerűbben, mint korábban. A data-ba várjunk
    // Buffer-t. A bájtok számát a data.length adja. A data[i] az i.
    // bájt karakterkódja - nem kell konvertálgatnunk. A data[i] írható
    // is egyben, azaz kiovassuk, xor-olunk, és visszaírjuk.
    // A függvény adja vissza ugyanazt a Buffert (csak a már módosított
    // tartalommal.)
}

function readTheFile(fileName) {
    // Ez adjon vissza egy Promise-t. A Promise végrehajtófüggvénye
    // használja az fs.readFile async függvényt. Az async függvény
    // callback-je hiba esetén reject-elje a promise-t, siker esetén
    // resolve-olja, mégpedig a fájl tartalmával.
}

readTheFile()
    .then(xorTheData)
    .then(writeTheFile);
