# Bevezetés a NodeJS, Typescript, és Angular.IO használatába

Minden fejezet gyakorlati, feladatokat ad. Mindent próbálj ki. Amíg ki nem
próbáltad a dolgokat, addig nem tudod őket.

Nagyon nyers a szöveg, ha valamit nem értesz,
[készíts egy ticket-et](https://github.com/baldvin-kovacs/progcourse/issues/new)!

Jó lesz bármilyen operációs rendszer, amin a NodeJS fut (Windows, Linux
és Mac is). Tudnod kell egy parancssori környezetet használni. Jó esetben
tudnod kell rekurzívan keresni.

Szükséged van egy editorra is --- a Nodepad nem lesz jó, valamilyen programozói
editorra. A legjobb olyat választani, ami nem segít létrehozni a projekt
konfigurációs fájljait. Az egyik fontos szempontja ennek a kurzusnak, hogy
adjon egy érzést, hogy te uralkodsz a rendszer fölött, és nem fordítva.
Egy editor ami létrehoz kriptikus konfig fájlokat, az ugyan segít, de elveszi
azt az érzést.

A könyv feltételezi, hogy már programoztál valamikor valamilyen nyelven.
Nem feltétlen Javascript-ben.

Amit ad: mutat egy csomó fontos, nem nyilvánvaló részletet a modern Javascript-ből,
olyan dolgokat, amelyek nélkül nehezen vagy sehogy nem érthetők modern
Javascript-es dolgok.

A könyv nem próbál teljes tananyag lenni, nem kezdi azzal, hogy milyen típusok
vannak a Javascript-ben, meg hogy hogyan kell egy függvényt írni. Minden
fejezet igyekszik valami nem nyilvánvalót mutatni, és az olvasóra bízza, hogy
az alapvető ismereteket bátran, akár menet közben az internetről kikeresse,
hozzátanulja.

## [1 - Npm, NodeJS, Typescript](001-npm_nodejs_typescript.md)

Létrehozzuk az első fejlesztő környezetünket. Az `npm` a `NodeJS` csomagkezelője,
letölti majd nekünk a szükséges csomagokat, itt például a Typescript fordítót.
A `NodeJS` egy parancssoros Javascript futtató. Nagyon fontos megismerni,
egy darabig `NodeJS`-re írjuk a programjainkat, csak később böngészőre.
A Typescript egy olyan Javascript jellegű nyelv, amelyik típusokat ad
a Javascript-hez. Ez a modern Angular nyelve, ezt is meg kell ismernünk.

## [2 - Callback függvények](002-callbacks.md)

Egy fejezet a callback-ekről. Egy végtelenül fontos téma, a modern Javascript
programozásának az alapja, hogy a callback-ekkel és az aszinkron API-k
használatátával megbarátkozz.

## [3 - Objektumok, osztályok, JSON](003-classes_json.md)

Egy igazán minimális bevezető a Javascript objektum-rendszerébe. A pre-ES6-os
rendszer felvillantása után a Typescript-es és az ES6-os szintaktikát nézzük
meg. Megnézzük, hogy mi az a JSON, és beolvasunk egy JSON fájlt, Javascript-ben
és Typescript-ben is.

## [4 - Gulp, és NodeJS Stream-ek](004-gulp.md)

A [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md) egy
igazán elterjedt program, amit nagyjából a `make` helyett használnak.
Ahhoz, hogy igazán értsük mi is az, kicsit el kell vele játszanunk, úgyhogy
írunk saját Gulp modult, amit a pipe-ba téve kiíratjuk, hogy összesen
hány karakter van a `.ts` fájljainkban.

## Következő fejezet

A https://groups.google.com/forum/#!forum/nodejs-typescript-angular-course levlistára
írok majd mindig, amikor van új fejezet, vagy valamit nagyon átírtam.







