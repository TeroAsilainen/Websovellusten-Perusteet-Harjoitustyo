# Websovellusten Perusteet 2025 Harjoitustyö

Tässä harjoitustyössä tarkoituksena oli luoda mielekäs websovellus käyttäen html:ää, CSS:ää ja JavaScriptiä.
Päädyin tekemään kolme eri sovellusta: themoviedb:tä hyödyntävä "Mitä tänään katsottaisiin?", sijaintiin perustuva tietovisa, sekä
PDF-tiedostojen yhdistämiseen tarkoitettu sovellus.

## Mitä tänään katsottaisiin?

Tämä sovellus etsii ***themoviedb.org*** API:sta satunnaista katsottavaa, käyttäjän valinnan mukaan joko elokuvan tai tv-sarjan. Ja jos ohjelma on tarjolla Suomessa suoratoistopalveluissa, kerrotaan tästäkin. Jälkimmäisen tiedon tarjoaa ***JustWatch***.

Sovellus tarvitsee API-avaimen, joka tulee sijoittaa script-kansioon tiedostoon nimeltä env.js.
Tiedoston sisältö:

> export const MOVIEDB_KEY = 'apiavain'

![Näyttökuva sovelluksesta](/images/screenshots/movie.png "Näyttökuva sovelluksesta")

Koodissa käytetään fetch - then -rakennetta tiedon käsittelyyn. Themoviedb-API ei suoraan tarjoa hakua satunnaiselle elokuvalle. Siispä ensin arvotaan satunnainen sivunumero (1-500), jolla haetaan lista elokuvista laskevassa suosiojärjestyksessä. API palauttaa noin sata ohjelmaa, joista vielä arvotaan ohjelma, jonka tiedot näytetään. Tämän jälkeen vielä haetaan tiedot mahdollisista suoratoistopalveluista.

## PDF-Yhdistin

Olen itse aiemmin tehnyt [PDF-yhdistämiseen sovelluksen](https://github.com/TeroAsilainen/PDFMerger) Python-jatkokurssin jälkimainingeissa hyödyntäen tkinteriä ja PyPDF-kirjastoa, joten ajattelin, että eihän se nyt niin vaikeaa voi olla samaa tehdä JavaScriptillä. Melko monta mutkaa matkalle sattui. Välillä ehdin jo Node.js:ääkin projektiin lisäämään, ja tuskastelemaan pari päivää tiedostojenhallinnan kanssa.

Koska varsinainen Backend oli tämän projektin mitoituksen ulkopuolella, eikä tiedostoja siis lähetetä millekään palvelimelle, tulee yhdistämiseen valitut tiedostot ensin siirtää projektin ***pdfshere*** -kansioon. Sieltä tiedostot voi valita käyttäen input-elementtiä, tai vetää ja pudottaa ikkunaan.

Varsinaisesta dokumenttien yhdistämisestä vastaa pdf-lib -kirjasto.

## Etäisyysvisa

Halusin hyödyntää sovelluksessani myös paikkatietoa jo ennen kuin se tuli vastaan kurssin harjoitustehtävissä. Päätin tehdä suhteellisen yksinkertaisen tietovisan, jossa kysymys on aina sama: Valitse itseäsi lähempi sijainti.

Alkuun suunnittelin, että kysymysvaihtoehdot voitaisiin valita satunnaisesti listasta. Mutta tulin pian toisiin aatoksiin, ja mietinkin sitten lähinnä mielekkäitä kysymyksiä juuri oulunseudulta tarkasteltuna.