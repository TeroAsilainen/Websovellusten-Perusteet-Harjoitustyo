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