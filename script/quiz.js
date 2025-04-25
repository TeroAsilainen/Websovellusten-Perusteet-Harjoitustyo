var usedLocation = { "nimi":'OAMK', "lon": 25.468, "lat": 65.062 };
var distanceA, distanceB
var oikeat = 0;
var kysymysindeksi = 0;

const questions =
{0 : {
    'a': { "nimi":'Kempele', "lon": 25.504, "lat": 64.913 },
    'b': { "nimi":'Haukipudas', "lon": 25.357, "lat": 65.177 }},
1 : {
    'a': { "nimi":'Hanko', "lon": 22.964, "lat": 59.829 },
    'b': { "nimi":'Utsjoki', "lon": 27.029, "lat": 69.909 }},
2 : {
    'a': { "nimi":'Pietari', "lon": 30.357, "lat": 59.932 },
    'b': { "nimi":'Tallinna', "lon": 24.747, "lat": 59.438 }},
3 : {
    'a': { "nimi":'Lontoo', "lon": 0.003, "lat": 51.479 },
    'b': { "nimi":'Wien', "lon": 16.375, "lat": 48.206 }},
4 : {
    'a': { "nimi":'Tunis (Tunisia)', "lon": 10.182, "lat": 36.799 },
    'b': { "nimi":'Madrid (Espanja)', "lon": -3.701, "lat": 40.416 }},
5 : {
    'a': { "nimi":'Kapkaupunki (Etelä-Afrikka)', "lon": 18.422, "lat": -33.922 },
    'b': { "nimi":'Rio de Janeiro (Brasilia)', "lon": -43.212, "lat": -22.948 }},
6 : {
    'a': { "nimi":'Miami (Yhdysvallat)', "lon": -80.201, "lat": 25.766 },
    'b': { "nimi":'Tokio (Japani)', "lon": 139.760, "lat": 35.677 }},
7 : {
    'a': { "nimi":'Kap Horn (Chile)', "lon": -67.272, "lat": -55.979 },
    'b': { "nimi":'Sydney (Australia)', "lon": 151.215, "lat": -33.857 }},
8 : {
    'a': { "nimi":'Reykjavik (Islanti)', "lon": -21.943, "lat": 64.147 },
    'b': { "nimi":'Istanbul (Turkki)', "lon": 28.980, "lat": 41.009 }},
9 : {
    'a': { "nimi":'Kairo (Egypti)', "lon": 31.133, "lat": 29.981 },
    'b': { "nimi":'Nuuk (Grönlanti)', "lon": -51.738, "lat": 64.175 }}
}

function showQuiz() {
    document.getElementById('pituuspiiri').innerHTML = usedLocation["lon"]
    document.getElementById('leveyspiiri').innerHTML = usedLocation["lat"]
    document.getElementById('a').removeAttribute('hidden')
    document.getElementById('b').removeAttribute('hidden')
    document.getElementById('kysymys').removeAttribute('hidden')
    document.querySelector('table').removeAttribute('hidden')
    document.getElementById('progress').removeAttribute('hidden')
    document.getElementById('progresslabel').removeAttribute('hidden')
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Your browser does not support geolocation!")
    }
}

function success(position) {
            usedLocation = {"nimi":'Sijainti', "lon": position.coords.longitude.toFixed(3), "lat": position.coords.latitude.toFixed(3)}
            showQuiz();
            quiz(0);
}

function error() {
            alert("Sijainti ei käytössä. Käytetään Linnanmaan kampusta!")
            showQuiz();
            quiz(0)
}
    


function calculateDistance(lat, lon)  {
    const r = 6371; // km
    const p = Math.PI / 180;
      
    const a = 0.5 - Math.cos((lat - usedLocation["lat"]) * p) / 2
            + Math.cos(usedLocation["lat"] * p) * Math.cos(lat * p) *
            (1 - Math.cos((lon - usedLocation["lon"]) * p)) / 2;
      
    return 2 * r * Math.asin(Math.sqrt(a));
}


function quiz(indeksi){
        document.getElementById('a').innerHTML = questions[indeksi]["a"]["nimi"]
        document.getElementById('b').innerHTML = questions[indeksi]["b"]["nimi"]
        distanceA = calculateDistance(questions[indeksi]["a"]["lat"], questions[indeksi]["a"]["lon"])
        distanceB = calculateDistance(questions[indeksi]["b"]["lat"], questions[indeksi]["b"]["lon"])
        console.log(distanceA)
        console.log(distanceB)
}

function answer(vastaus) {
    var vastausOikein;
    if (vastaus == 'a') {
        if (distanceA < distanceB) {
            vastausOikein = true;
        } else {
            vastausOikein = false;
        }
    } else {
        if (distanceA < distanceB) {
            vastausOikein = false;
        } else {
            vastausOikein = true;
        }
    }
    if (vastausOikein){
    oikeat += 1;
    console.log('Oikeat vastaukset: ' + oikeat)
    }
    kysymysindeksi += 1;
    document.getElementById('progress').value = (kysymysindeksi / Object.keys(questions).length) * 100;
    if (kysymysindeksi < Object.keys(questions).length) {
        quiz(kysymysindeksi);
    } else {
        document.getElementById('a').hidden = true
        document.getElementById('b').hidden = true
        document.getElementById('kysymys').innerHTML = 'Visa päättyi'
        document.getElementById('pisteet').innerHTML = 'Oikeat vastaukset: ' + oikeat + ' / ' + Object.keys(questions).length
    }
}

document.getElementById('a').addEventListener('click', () => {
    answer('a')
})

document.getElementById('b').addEventListener('click', () => {
    answer('b')
})

document.querySelector('#aloita').addEventListener('click', () => {
    var valinta
    const valintaLista = document.getElementsByName('choice')
    valintaLista.forEach(element => {
        if (element.checked == true){
            valinta = element.value
        }
        element.hidden = true;
    });

    const vaihtoehtoLista = document.getElementsByName('vaihtoehto')
    vaihtoehtoLista.forEach(element => {
        element.hidden = true
    });

    console.log(valinta);
    document.querySelector('#aloita').hidden = true;
    if (valinta === 'location') {
        getLocation();
        console.log(usedLocation)
        
    } else {
        usedLocation = { "nimi":'OAMK', "lon": 25.468, "lat": 65.062 }
        console.log(usedLocation)
        showQuiz();
        quiz(0);
    }
})