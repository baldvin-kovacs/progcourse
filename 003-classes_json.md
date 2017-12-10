# 3 - Objektumok, osztályok, JSON

## Objektumok a Javascript-ben

A Javascript-ben minden objektum. Mindig is az volt, a Javascript első változataitól
kezdve. Van néhány primitív típus (`boolean`, `number`, `string`), minden más az
`Object` leszármazottja.

Egy új üres objektumot létrehozhatunk így:

```
const x = new Object();
```

vagy röviden:

```
const x = {};
```

Az objektumokhoz mindenféle mezőket szabadon hozzáragaszthatunk, nem kell
előre egy típust létrehoznunk:

```javascript
const x = {};
x.valami = 7;
x.masikValami = {};
x.masikValami.y = 8;
```

Ugyanezt egyszerűsített szintaktikával így is írhatjuk:

```javascript
const x = {
    valami: 7,
    masikValami: {
        y: 8,
    },
}
```

Az objektum mezőit elérhetjük `x.valami` vagy `x['valami']` szintaktikával is,
a kettő ugyanazt jelenti.

Minden objektumnak van egy `prototype` mezeje. Ez egy rejtett mező, a mezők
egyszerű felsorolásakor nem jelenik meg, sőt, le sem tudjuk kérdezni egyszerű
mező-hivatkozással. Az `x` prototípusát az `Object`-nek egy metódusával
tudjuk lekérdezni, így:

```javascript
const prototipus = Object.getPrototypeOf(X)
```

Amikor egy objektum egy mezejére
hivatkozunk, akkor a Javascript futtató először lekérdezi, hogy van-e ilyenje
az objektumnak, ha nincs, akkor meg megnézi, hogy van-e a prototípus-objektumnak,
ha nincs, akkor a prototípus prototípusának, és így tovább.

A `new Valami()` szintaktika elég trükkös, a következőt csinálja:

1. Készít egy üres objektumot, és megteszi prototípusnak a `Valami` prototípusát.
2. Lefuttatja a `Valami`-t, de úgy, hogy a `Valami`-n belül a `this` jelentse épp
   az újonnan készített objektumot.
3. Visszaadja az új objektumot.

Látható, hogy a `Valami` egy függvény, konstruktorként használja a rendszer, mégis,
osztályként viselkedik. És igen, az ES6 előtt nem is volt külön szintaktika arra,
hogy osztályt készítsünk, függvényeket írtunk, és azok prototípusaihoz adogattunk
metódusokat:

```javascript
function Valami() {
    this.adat = 3;
}

Valami.prototype.kiirato = function() {
    console.log("adat:", this.adat);
}

const v = new Valami();
v.kiirato();
```

### 1. Feladat - Írassuk ki részletesen a fenti objektumainkat, és a prototípusokat

Használjuk a NodeJS [`util.inspect`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_inspect_object_options)
függvényét ahhoz, hogy egy egyszerű objektumot, annak prototípusát, valamint a fenti `Valami` egyik
példányát kiírassuk.

A fájlunknak valahogy így kell majd kinéznie:

```javascript
const util = import('util');

Itt létrehozni egy egyszerű objektumot, mondjuk x névvel.

console.log("*** x:", util.inspect(x, {customInspect: false, showHidden: true, depth: null, colors: true}));

const xProto = Object.getPrototypeOf(x);

Itt kiiratni az xProto-t is.

Itt meg definialni a Valami osztalyt.
Azt is kiiratni.
Itt venni a prototipusat.
Azt is kiiratni.
```

Ahhoz, hogy `util.inspect` mindenképp részletes, szép eredményt adjon, jó sok paramétert kell neki
adnunk. Írhatunk egy függvényt hozzá:

```javascript
function dump(val) {
    return util.inspect(val, {
        customInspect: false,
        showHidden: true,
        depth: null,
        colors: true});
}
```

Nem kell még `npm init` sem, semmilyen modult nem használunk a NodeJS beépített `util` modulján
kívül, úgyhogy `node debug_print.js` paranccsal futtathatjuk a kódunkat.

([☞ megoldás](003-classes_json/megoldas-01))

## Classok az ES6-ban

Az ES6-ban már vannak osztályok --- ezek syntactic sugarként vannak a nyelvben,
de az eredeti olyan bonyolult volt, hogy igazán fontos syntactic sugarról van szó.
Az érdekesség kedvéért a Typescript irányából közelítjük meg az ES6-os osztályokat.

Készíts egy könyvtárat, inicializáld az npm-et, installáld a Typescript-et,
ne feledkezz meg a `tsconfig.json` létrehozásáról (lásd az 1. fejezetben),
és hozz létre egy `class_example.ts` nevű fájlt a következő tartalommal:

([☞ példa](003-classes_json/pelda-classes_in_es6))

```typescript
class Jarmu {
    public kerekekSzama: number;
    private mukodik: boolean;
    
    constructor(n: number) {
        this.kerekekSzama = n;
        this.mukodik = true;
    }

    elront() {
        this.mukodik = false;
    }
}

const a = new Jarmu(3);
a.elront();
console.log(a);
```

Noha ennek az értelme elég intuitív, de valamikor (nem most rögtön) a Typescript
[osztályokról szóló leírását](https://www.typescriptlang.org/docs/handbook/classes.html)
mindenképp érdemes elolvasni, sok különleges dolog van benne.

Most inkább nézzük, hogy hogyan fordítja ezt Javascript-té. Először nézzük a modern
Javascript-et, amit ES6-ként is emlegetünk:

```
./node_modules/.bin/tsc --target es6
```

A létrejött `class_example.js` fájl tartalma:

```javascript
class Jarmu {
    constructor(n) {
        this.kerekekSzama = n;
        this.mukodik = true;
    }
    elront() {
        this.mukodik = false;
    }
}
const a = new Jarmu(3);
a.elront();
console.log(a);
```

Nagyon hasonló, két kis különbséggel:

1. Nincs deklarálva a két member (a `kerekekSzama` és a `mukodik`), csak
   inicializálva vannak a konstruktorban.
2. Nincsenek típusok, a konstruktor paraméterének például csak a neve van
   megadva.

## Öröklődés

A származtatás szintaktikája, és az ős-konstruktor hívásának szintaktikája
is ugyanaz, próbáld ki, készíts egy `inheritance.ts` nevű fájlt, ugyanabban
a könyvtárban, a következő tartalommal:

```typescript
class Auto {
    public isBusz: boolean;
    constructor(readonly num_passengers: number) {
        if (num_passengers <= 9) {
            this.isBusz = false;
        } else {
            this.isBusz = true;
        }
    }
}

class Trabant extends Auto {
    constructor() {
        super(4);
    }
}

const t = new Trabant();
console.log(t);
```

Ismét lefuttatva a `./node_modules/.bin/tsc` parancsot, nézd meg, hogy mit kaptál
az `inheritance.js` fájlban. Láthatod, hogy ugyanúgy a `super(...)` hívást
használhatjuk az ős konstruktorának a hívására, és ugyanúgy az `extends` kulcsszóval
adhatjuk meg, hogy egy osztály melyik másik osztályból örököljön.

## Const és let a var helyett

A `const valami = ....;` szintaktika egyszerűen egy `valami` nevű változó létrehozását
jelenti. A `const`-tal létrehozott változók nem módosíthatóak. Vigyázz, amire mutatnak,
az esetleg igen! Például:

```javascript
const tomb = [1, 1, 3, 5, 7];

tomb = [2, 4, 6, 8];   /// Ez nem fog menni, a tomb nem mutathat masra.

tomb[0] = 17;   /// Ez menni fog.
```

Olyan változót, amit változtatni is akarunk, a `let`-tel lehet létrehozni:

```javascript
let a = 23;
a = a + 5;
```

Mind a `const`, mind a `let` az ES6-ban jelentek meg. Az ES5-ben még csak `var`
volt erre használható. A `var`-nak sok problémája van, az egyik legnagyobb, hogy nem
blokk-ban érvényes csak, hanem a teljes függvényben:

```javascript
function alma() {
    var x = 42;
    if (true) {
        var x = 37;
    }
    console.log(x);
}
alma();
```

Az `alma()` hívása 37-et ír ki, és ez a viselkedés számtalan bug okozója. Úgyhogy az
ES6-ban bevezetett `const` és `let` már úgy lett kitalálva, hogy blokk-scope-os legyen,
azaz ott a belső `x` már egy másik `x`, akár `const`-ot, akár `let`-et használunk a `var`
helyett.

A modern style-guide-ok a `var` használatát egyszerűen megtiltják.

## ES5-ös osztályok

A korábbi Javascript változatok a fenti "Objektumok a Javascriptben" fejezetben írtak
szerint egy furcsa szintaktikával valósították meg az objektum-orientációt: konstruktorfüggvényeket
kellett írni, és azok prototípus-objektumaira kellett ráaggatni a metódusokat.

Ennek az egésznek könyvtárnyi irodalma, és legalább annyi buktatója van. Érdekességképpen nézzük
meg, hogy `./node_modules/.bin/tsc --target es5`-tel fordítva hogy néz ki a `class_example.js`:

```javascript
var Jarmu = /** @class */ (function () {
    function Jarmu(n) {
        this.kerekekSzama = n;
        this.mukodik = true;
    }
    Jarmu.prototype.elront = function () {
        this.mukodik = false;
    };
    return Jarmu;
}());
var a = new Jarmu(3);
a.elront();
console.log(a);
```

Látszik, hogy osztály helyett egy sima `var`-os változó lett a Jarmu, megpedig egy
függvényt visszaadó függvény, ami rögtön meg is van hívva:

```javascript
var Jarmu = /** @class */ (function () {
   ...
}());
```

Ennek az értelme csak annyi, hogy így a rögtön megívott függvény-en belül definiált dolgok
csak azon belül lesznek láthatóak, és egyedül maga a `Jarmu` lesz kivul is lathato.

Ott belül éppen az előbb leírt prototype-alapú osztálydefiníció van.

Az `inheritance.js` már egy kicsit hajmeresztőbb, nézz bele, de megérteni nem kell.

## JSON - Javascript Object Notation

A JSON olyasmi, mint a Javascript egyszerűsített objektum-definíciós formátuma,
de nem ugyanaz!

A következő valid Javascript, de nem valid JSON:

```javascript
{
   datum: new Date(),
   szam: 4,
}
```

Három fő különbségre kell emlékeznünk:

1. JSON-ban nem hagyhatjuk el az idézőjeleket a kulcsokból, tehat `"szam":` és nem `szam:`.
2. JSON-ban tilos vesszőt tenni az utolsó adattag után, azaz `"szam": 4` és nem `"szam": 4,`.
3. JSON-ban csak `string`, `number` típusok, `true` vagy `false` értékek, valamint `{...}` és
   `[...]` használható értéknek. A `new Date()`-et nem értelmezi a JSON parser.
   
Valid JSON például a következő:

```json
{
  "szamok": [3, 4, 5, 6],
  "sikeres": true,
  "valami": {
    "x": 7,
    "y": "alma"
  }
}
```

### 2. Feladat: JSON fájl beolvasása NodeJS api-val, Javascript-ben

Írjunk egy NodeJS-es Javascript programot, amelyik beolvas egy JSON fájlt, objektummá
alakítja a tartalmat, majd megszámolja, hogy hány mezeje lett a létrejött Javascript
objektumnak.

Ha böngészgetjük a NodeJS `fs` moduljának a [dokumentációját](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html),
akkor találunk benne egy nagyon egyszerű fájl-beolvasó függvényt, a
[`readFileSync`](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfilesync_path_options)-et.

Használjuk ezt, most nem kell az Async api-val kínlódni.

```javascript
const fs = require('fs');
const process = require('process');

const tartalom = fs.readFileSync(process.argv[2], "utf8");
console.log("tartalom:", tartalom);
```

A többi részét nem teljesen lövöm le, csak két kulcsot adok: a Javascript-ben van egy `JSON` nevű
modul, annak is egy `JSON.parse(ide valami json string jön)` és egy `JSON.stringify(ide viszont ojjektum)`
függvéne. Az előbbit használjuk arra, hogy a tartalomból Javascript objektumot csináljunk.

A `JSON` modul annyira mélyen része a Javascript-nek, hogy nem kell beimportálni, csak úgy van és kész,
lehet használni.

Ha van egy objektumunk, mondjuk az a neve, hogy `parsed`, akkor az `Object.keys(parsed)` ad egy
tömböt, amiben épp az objektum mezői vannak felsorolva.

A tömböknek (array-eknek) pedig van `.length` property-je --- vigyázz, ez nem függvény, csak simán
így megy:

```javascript
const x = [3, 7, 21];
console.log(x.length);
```

A programhoz nem kell semmilyen npm modul, de kell egy input fájl, például a fenti valid JSON példa
lehet a tartalma.

A `node readjson.js minta.json` parancsnak 3-at kell kiírnia, ha jól írtuk meg
a kódot.

([☞ megoldás](003-classes_json/megoldas-02))

### 3. Feladat: JSON fájl beolvasása NodeJS api-val, Typescript-ben

No most pontosan ugyanezt, de Typescript-ben. Ez nagyon hasonló, és még unalmasnak
is tűnhet, de gyakorlás nélkül nem lehet megtanulni zongorázni, írd be ezt is.

Itt létre kell hozni a környezetet:

```bash
mkdir megoldas-03
cd megoldas-03
npm init
npm install typescript --save-dev
npm install @types/node --save-dev
```

Hozd létre a `tsconfig.json` fájlt, és ne feledd hogy a NodeJS miatt commonjs modul
előállítását kell kérni a Typescript-től:

```json
{
    "compilerOptions": {
	"target": "ES6",
	"module": "commonjs"
    }
}
```

Hozd létre megint a `minta.json` fájlt.

Hozz létre egy `readjson.ts` programot. Ennek a kódja majdnem pontosan az előző
feladat megoldása, csak Typescript-es szintaktikával kell a modulokat beimportálni.

Kétféleképp is csinálhatod, vagy beimportálod a teljes modulokat:

```typescript
import * as fs from 'fs';
import * as process from 'process';
```

Ekkor a maradék kódon semmit nem kell változtatni.

Beimportálhatod csak azokat a dolgokat a modulokból, amiket akarsz is használni:

```typescript
import {readFileSync} from 'fs';
import {argv} from 'process';
```

Ekkor a kódban `fs.readFileSync` helyett simán `readFileSync`-et, `process.argv`
helyett pedig egyszerűen `argv`-t kell használni. Futásidőbeli, vagy fordított
kód méretbeli különbség nincs a kettő között, szimpátia alapján dönthetsz.

Fordítsd le, és futtasd az eredményként kapott `.js` fájlt:

```bash
./node_modules/.bin/tsc
node readjson.js minta.json
```

([☞ megoldás](003-classes_json/megoldas-03))
