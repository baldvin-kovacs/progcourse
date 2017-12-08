# 3 - Gulp, és NodeJS Stream-ek

A [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md) egy
igazán elterjedt program, amit nagyjából a `make` helyett használnak.
Ebben a fejezetben játszunk egy kicsit a Gulp-pal, mégpedig azért,
mert kulcsfontosságú a megértése ahhoz, hogy egy ismeretlen kódot
látva megértsük, hogyan vannak benne összedrótozva a komponensek.

A Gulp fent linkelt dokumentációja egy nagyon szuggesztív kóddal
indul:

```javascript
gulp.src('client/templates/*.pug')
  .pipe(pug())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```

Valamit csinál az `gulp.src`, és valahogy belepipe-olja az eredményt
a `pug()`-ba, de mit pipe-ol bele, és miféle dolog az a `pug()`??

A dokumentáció elvileg segít, de valójában eléggé elküld az erdőbe,
mind a három link sok estés olvasmány:

> Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/gulpjs/vinyl-fs)
> that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options)
> to plugins.

Az első feladat, amit kitűzünk magunknak: próbáljuk ki, mit is
pipe-ol a Gulp nekünk? Azaz, valami ilyesmit szeretnénk írni:

```javascript
gulp.src('*.ts')
  .pipe(valamiSajatCucc())
```

A `valamiSajatCucc()`-ot először primitívre készítjük, simán csak
írja ki a képernyőre, hogy mit pipe-olt bele a `gulp.src`.

Nyissunk egy könyvtárat, benne `npm init`, Enter, Enter, stb,
majd `npm install gulp --save-dev`.

A `./node_modules/.bin/gulp` parancsnak működnie kell, és panaszkodnia,
hogy nincs `gulpfile`.

Készítsünk egyet. A Gulp konfigurációja egy sima Javascript fájl, amit
induláskor végrehajt. A tetejére kell egy

```javascript
const gulp = require('gulp');
```

Ennek a sornak a jelentése: a `gulp` nevű modult töltsd be, és a referenciáját
tedd a `gulp` nevű változóba. Talán emlékszünk még, hogy Typescript-ben
`import ...` volt a modulok betöltésének a szintaktikája. Javascript-ben
létezik több versenyző szintaktika is, a `require(...)` csak egy a sok közül.
Ez az, amit a NodeJS használ, és CommonJS modul rendszernek nevezik.

Van valódi import szintaktika az ES6-ban, eléggé hasonló a Typescript-éhez,
de azt a NodeJS nem támogatja.

Ezek után lehet a fájlban bármiféle NodeJS által érthető Javascript kód, nem
csak ami a Gulp konfiguráció része. Akármi, csak fusson. Persze érdemes valahol
megívnunk a Gulp konfigurációs függvényeket is, különben a Gulp a `gulpfile.js`
lefuttatása után panaszkodik, hogy nem tudja, mit kell csinálni.

A Gulp mindössze négy primitívet ad, ezek a `gulp.src`, `gulp.dest`,
`gulp.task` és a `gulp.watch`.

Ha bárhol a kódban meghívjuk a `gulp.task`-ot, akkor a Gulp memóriájába
bekerül egy task, azzal a névvel és értelemmel, amilyen paramétereket
a `gulp.task`-nak adtunk.

Miután a Gulp lefuttatta a `gulpfile.js`-t, megnézi, hogy milyen task-ok
kerültek a memóriájába, és végrehajtja vagy a `default` nevűt, vagy ha
a felhasználó paraméterben másikat kért végrehajtani, akkor azt amit
a felhasználó kért.

Látjuk hát, hogy mi a cél:

```javascript
const gulp = require('gulp');

function valamiSajatCucc() {
  ????
}

gulp.task('default', () => {
    gulp.src('*.ts')
        .pipe(valamiSajatCucc())
})
```

Mi az a `.pipe`, hogy kell érteni azt a `gulp.src`-s két sort? Leegyszerűsítve
működhetne például így:

1. Meghívódik a `gulp.src(...)`, ami konstruál egy objektumot, és annak az objektumnak
   mondjuk valami `.data` mezejébe betölti az összes `*.ts` fájlt, egy nagy tömbként,
   minden elem mondjuk `{name: ..., content: ...}` alakú. A `gulp.src` függvény ezután
   visszaadja ezt az objektumot. 
2. A `gulp.src` olyan objektumot konstruált és adott vissza, amelybe nemcsakhogy
   betöltötte az adatokat, de van neki egy `.pipe(valami)` metódusa. Ez a `.pipe(valami)` metódus
   végigmegy a `.data` elemein, és ebbe a valamibe betáplálja őket, egyiket a
   másik után.
3. Miután kész, a `pipe()` is visszaadja ugyanazt a referenciát, amit ő kapott, hogy
   további `pipe()`-okat lehessen hívni.
   
A valóságban ennél bonyolultabban működik, de nem sokkal. Kicsit kell is hogy bonyolultabb
legyen, mert azt is meg akarhatjuk oldani, hogy a pipe-nak beadott "valami" az képes
legyen átalakított, vagy akár más, újonnan gyártott objektumokat továbbadni.

## NodeJS Stream-ek

Nézzük csak a fenti 

