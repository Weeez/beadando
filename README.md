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

## Tervezés
## Implementáció
## Tesztelés
## Felhasználói dokumentáció
