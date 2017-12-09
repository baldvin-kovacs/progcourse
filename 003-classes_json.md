# 3 Classes, Objects, JSON

## class az ES6-ban

Készíts egy könyvtárat, inicializáld az npm-et, installáld a Typescript-et,
ne feledkezz meg a `tsconfig.json` létrehozásáról (lásd az 1. fejezetben),
és hozz létre egy `class_example.ts` nevű fájlt a következő tartalommal:

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

A korábbi Javascript változatok is objektum-orientáltak, csak éppen nem volt meg bennük
a `class` kulcsszó.

Olyannyira objektumorientált volt a Javascript, mindig is, hogy maguk a függvények
is objektumok voltak, és lehetett hozzájuk adattagokat biggyeszteni. Például így:

```javascript
function fv(a, b) {
    return a + b;
}

fv.szelhamossag = 25;

console.log(fv(3, 4));
```

Ez tulajdonképpen hajmeresztő, az a 25 ott "lóg" a függvény-objektumon. A függvény-objektum
fontos része maga a kódja, de úgy látszik, szépen megférnek mellette más adattagok is.

Fontos: ami ezután jön az ES5-ről, azt semmiképpen sem kell tudnod innen megérteni. Lapozz azért lejjebb, mert a JSON-ról is lesz még ebben a fejezetben szó.
Főleg azért írom,
hogy lásd, kb. így néztek ki az ES6 előtti kódok. Sok leírás van a neten a prototípus-alapú
Javascript osztály-orientációról, nézd meg őket, amikor épp szükséged van valaminek a pontosabb
megértésére. Kis szerencsével neked soha nem kell ilyen kódot írnod.

A dolog tehát bonyolódik. Minden függvénynek (illetve, minden objektumnak) van egy prototípusa.
Amikor egy member-re hivatkozunk a kódban, akkor a rendszer előbb megnézi, hogy annak az
objektumnak van-e ilyenje, és ha nincs, akkor megnézi, hogy a protoípusnak van-e. A
Protoípusnak van prototípusa, és így tovább, egész az `Object`-ig, ami mindennek az őse.

Osztálymetódusokat a prototípusokon szokták létrehozni, valahogy így:

```javascript
var fv = function(a, b) {
    this.x = a + b;
}

fv.prototype.osztalyMetodus = function() { return this.x + 25 };
```

Vedd észre, hogy `function fv(a, b) {...}` helyett `var fv = function(a, b) {...}` szerepel.
A másik is működik, nem pontosan tudom, hogy miért a var-os alakot szokták használni, arra tippelek,
hogy más láthatósági szabályok vonatkoznak a két formára.

A `this` a függvényen belül egy speciális szó, azt jelenti: "ami ehhez a függvény objektumboz bind-olva van".

Van egy kulcsszó, amelyik készít egy üres objektumot ugyanazzal a prototípussal, ami a függvény
prototípusa, ezt az új objektumot bind-olja a függvényhez, és meghívja a függvényt. Ezt a kulcsszó
a `new`. Azaz, a fenti osztálydefiníció után írhatjuk, hogy

```javascript
var peldany = new fv(3, 5);
```

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

