# 1 - npm, NodeJS, Typescript

Cél: a fejlesztő környezet kialakítása.

Olvasd el a wikipédia [NodeJS cikkét](https://en.wikipedia.org/wiki/Node.js) (és
NEM a NodeJS dokumentációját, az végtelen). Telepítsd fel a NodeJS-t
(https://nodejs.org/en/download/ - a node -v és az npm -v parancsoknak működniük kell).

Hozz létre egy könyvtárat valami egyszerű névvel. Egy parancssori ablakban lépj be abba
a könyvtárba. Ha Windowst használsz, használj PowerShell-t (Windows gomb, majd gépelni
kezded, hogy Powershell, és meg fog jelenni az indítója a menüben). Ha Powershell-t
használsz, akkor a parancsok amiket írok a könyvben kell hogy működjenek, ha másként
nem, akkor üss tabulátort miután legépeltél egy `valami/valami/valami` fájlnevet,
és akkor ki fogja cserélni `valami\valami\valami`-re. Nem mindig kell kicserélni,
néhány Javascript-es library kimondottan a `/`-es változatot kéri. A parancsokat
én Unix alatt próbálom ki, szólj, ha valamelyik nem megy Windows alatt.

```bash
mkdir hello
cd hello
```

Abban a könyvtárban: `npm init`. Ez kérdez egy csomót, mindenre jó a default, akkor is, ha a
default üres.

Az `npm init` létrehoz egy `package.json` nevű fájlt. Nézz bele. Ez fogja tartalmazni
azoknak a csomagoknak a listáját, amelyekre a kódod dependál.

Hozz létre egy fájlt `hello.ts` névvel,  egy egyszerű tartalommal:

```
function hello(): void {
	console.log("hello");
}

hello();
```

Továbbá egy typescript config fájlt, ugyanebben a könyvtárban.

```
{
  "compilerOptions": {
    "target": "ES6"
  }
}
```

Telepítsd fel a Typescript-et itt, lokálisan. A Typescript dokumentációja mást
(globális telepítést) javasol, egyelőre ne azt kövesd. Egy egyszerű parancs kell csak hozzá:

```
$ npm install --save-dev typescript
```

Nézd meg a packages.json-t: beleírta a Typescript-et, development dependency-ként.
A development dependencyk olyanok, hogy a végső terméknek nem részei, de az adott
projekt fejlesztői környezetének igen.

Nézegesd meg a `node_modules/` alkönyvtárat: abba tette a Typescript fordítót.

Ha a `tsconfig.json` nem tartalmaz utasítást arra, hogy miket fordítson,
akkor az összes `.ts` fájlt fordítja, rekurzívan az adott könyvtárban. Nekünk
éppen ez kell most:

```bash
$ ./node_modules/.bin/tsc
```

A tsc elő kellett hogy állítson egy `hello.js` nevű fájlt. Futtasd le:

```
node hello.js
```

([☞ megoldás](001-npm_nodejs_typescript/01-megoldas))
