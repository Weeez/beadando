# Dokumentáció </br>Tantárgy felvétel (tanári oldalról)

Balázs András - QO728I - xeropax@gmail.com

------

## Követelmények
1. Funkcionális követelmények:
    * Az oldal tartalmához jogosulatlan személy nem férhet hozzá, csak a tájékoztató üzenetekhez. Ebből következik, hogy a regisztrált felhasználók között megkülönböztetünk szerepköröket, azaz különböző jogosultságokat.
    * Regisztrációt követően az új felhasználó 'hallgató' jogosultságot kap, amivel hozzáfér a tanárok által szerkesztett tárgylistához.
    * A 'tanár' jogosultságú felhasználóknak van egyedül joguk az oldalt teljeskörűen kihasználni, ők tudnak új elemeket hozzáadni a tárgylistához, vagy a régieket törölni, módosítani 
        * Új elem felvételekor az oldal átnavigál a listaoldalra, a lista tartalma változik.
        * Régi elemek módosításakor az oldal visszanavigál a listaoldalra, a lista tartalma változik.
        * Régi elem törlésekor nincs "látható" navigáció (helyben navigál), a lista tartalma változik.
2. Nem funckionális követelmények:
    * Bejelentkezést követően eltűnnek a Regisztrációs és Bejelentkezés opciók az oldalról, helyükre Üdvözlő üzenet és Kijelentkezés lehetőségek kerülnek.
    * Csak regisztrált felhasználónak van lehetősége bejelentkezni.
    * A bejelentkezésig nem érhetőek el a szerepkörökhöz kötött funkciók, ezen végpontok hívásakor az oldal visszanavigál a bejelentkezés oldalra.
    * Ha valaki 'hallgató' jogosultsággal hívja meg a 'tanár' jogosultságú végpont oldal(aka)t, akkor visszanavigálja a kezdőoldalra.
3. Szakterületi fogalomjegyzék:
    * subject: A Tantárgy adatait tároló objektum. Tulajondságai: 
        * chbox: html radio gomb, szöveges formátumban tárolva (String),
        * subject_name: a tárgy neve, szöveges formátumban tárolva (String),
        * subject_code: a tárgy kódja, szöveges formátumban tárolva (String),
        * subject_size: a tárgyat hallgatható diákok száma, szöveges formátumban tárolva (String),
        * subject_location: a tárgy tanterme (helyszine), szöveges formátumban tárolva (String),
        * subject_teacher: a tárgyat oktató professzor neve, szöveges formátumban tárolva (String)
    * user: A regisztrált felhasználókat leíró objektum. Tulajdonságai:
        * neptun: a felhasználó neptun kódja, szöveges formátumban tárolva (String),
        * password: a felhasználó jelszava, szöveges formátumban tárolva (String),
        * role: a felhasználó szerepköre, enumként tárolva.
    * list: A tantárgyak listája. Kódbeli reprezentációja a subject-ek listázása, html oldalon.
    * new: Új tantárgy felvételének lehetősége, űrlap oldal segítségével, html gombbal.
    * update: Egy létező tantárgy módosításának lehetősége, űrlap oldal segítségével, html gombbal.
    * delete: Egy létező tantárgy törlésének lehetősége, html gombbal.
4. Használatieset-modell:

![Ábra](https://raw.githubusercontent.com/weeez/beadando/master/public/pics/dokum.jpg "")

Új felhasználó regisztációjának, bejelentkezésének és a listaoldal szerkesztésének folyamatábrája

![Ábra](https://raw.githubusercontent.com/weeez/beadando/master/public/pics/kep.jpg "")

## Tervezés
1. Architectúra terv
    * Oldaltérkép
        * Főoldal
        * Bejelentkezés / Kijelentkezés
        * Regisztráció
        * Tárgyfelvétel 
            * Módosítás
            * Törlés
        * Új tárgy hozzáadása
        * Rólunk

2.Felhasználói felületmodell:</br>
Főoldal</br>
Bejelentkezés</br>
Kijelentkezés</br>
Regisztráció</br>
Tárgyfelvétel</br>
Új tárgy hozzáadása</br>
Rólunk</br>
</br>
3. Osztálymodell:</br>
</br>
![Ábra](https://raw.githubusercontent.com/weeez/beadando/master/public/pics/osztalymodell.jpg "")
</br>
4. Dinamikus működés: (szekvencia diagram)</br>
</br>
![Ábra](https://raw.githubusercontent.com/weeez/beadando/master/public/pics/diagram.jpg "")

## Implementáció
* __Fejlesztői környezet__: Cloud 9 felhőalapú IDE, ami a www.c9.io linken keresztül elérhető. Virtuális gépként(szerverként) is tudjuk használni, amit szabadon szerkeszthetünk, valamint megoszthatunk másokkal és a kódunkba is betekintést engedhetünk.
* __Könyvtárstruktúrában lévő mappák funkciója__: MVC modell alapján készült. A *_views_* mappa tartalmazza a megjelenítő réteget, a *_models_* fájljai írják le az adatok típusait, a *_controllers_* mappa tartalma pedig a végpont kezelésért felel. A *_további mappák_* a működést segítő fájlokat tartalmazzák.
* __Kódszerkezet__:
    * *.tmp*
        * __default.db__
        * __disk.db__
    * *config*
        * __config.js__   
    * *controllers*
        * __aboutRourter.js__
        * __indexRouter.js__
        * __loginRouter.js__
        * __logoutRouter.js__
        * __regRouter.js__
        * __subjectsRouter.js__
    * *models*
        * __subject.js__
        * __user.js__
    * *node_modules*
        * *telepített keretrendszerek*
    * *public*
        * *css*
            * __bootstrap.min.css__
        * *js*
            * __bootstrap.min.js__
            * __jquery.min.js__
        * *lib*
        * *pics*
            * *dokumentációhoz szükséges képek*
    * *test*
        * *test fájlok*
    * *views*
        * *subjects*
            * __list.hbs__
            * __new.hbs__
            * __update.hbs__
        * *users*
            * __login.hbs__
            * __registration.hbs__
        * __about.hbs__
        * __index.hbs__
        * __layout.hbs__
    * __package.json__
    * __README.md__
    * __server.js__
</br>

## Tesztelés
A tesztelés a __zombie.js__ nevű keretrendszerrel történik. Az API (Application Programming Interface) egyik nagy erőssége, hogy nincs szükség valódi böngészőre a kódunk futtatásához és ellenőrzéséhez, mert azt szimulálni képes. Másik érdeme, hogy a többi tesztkörnyezettel ellentétben rendkívül gyors.
## Felhasználói dokumentáció
1. __A futtatáshoz ajánlott hardver-, szoftver konfiguráció:__ 
    * 2 GB memória
    * 3.-ik / 4.-edik generációs i5 processzor
    * Windows 7 vagy újabb
2. __A program használata:__ A felhasználó a kezdőoldalon találja magát, ahol 4 opció közül választhat. A __Főoldalra__ lép, ahol jelenleg is tartózkodik, a __Rólunk__ oldalra navigál, ami leírja az oldalról szükséges tudnivalókat, a __Bejelentkezés__ oldalra lép, ahol belép a saját fiókjába, és eléri az oldal rejtett funkcióit, vagy a __Regisztráció__ lehetőséget választja, ahol regisztrálhat magának új felhasználónevet és jelszót. A fiókba lépés esetén átnavigál a főoldalra, és belép is a felhasználói fiókjába. A regisztrált felhasználónak egy új opció nyílik meg, a __Tárgyfelvétel__, ahol megnézheti milyen tantárgyak közül választhat. Ha a felhasználónak van *tanári* jogosultsága, akkor lehetősége van a tantárgylista tartalmának szerkesztésére, az __Új tárgy felvétele__ menüponttal valamint a __módosítás__ és __törlés__ gombok segítségével. Ha a felhasználó végzett, a __Kijelentkezés__ menüponttal kilépet a fiókjából, és visszatérhet a főoldalra.
