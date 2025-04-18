import {MOVIEDB_KEY} from "./env.js";

const getRandomIntInRange = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

function getWatchProviders(programType, id) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + MOVIEDB_KEY
        }
      };
      
      fetch('https://api.themoviedb.org/3/' + programType + '/' + id + '/watch/providers', options)
        .then(res => res.json())
        .then(json => {
            try {
            const palvelu = json["results"]["FI"]["flatrate"];
            console.log(palvelu);
            if (palvelu != null || palvelu != undefined) {
                document.querySelector('#Katsottavissa').innerHTML = "Katsottavissa suoratoistona:";
                document.querySelector('#lista').innerHTML = "";
                palvelu.forEach(element => {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(element["provider_name"]))
                    li.style.background =  "url(https://image.tmdb.org/t/p/original" + element['logo_path'] + ") no-repeat left top"
                    document.querySelector('#lista').appendChild(li)
                });

            } else {
                document.querySelector('#Katsottavissa').innerHTML = "";
                document.querySelector('#lista').innerHTML = "";
            }
            }
            catch (ReferenceError){
                document.querySelector('#Katsottavissa').innerHTML = "";
                document.querySelector('#lista').innerHTML = "";
            }
            
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}


function getSomethingToWatch(programType) {
    let sivu = getRandomIntInRange(1, 500);
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + MOVIEDB_KEY
        }
    };
      
    fetch('https://api.themoviedb.org/3/discover/' + programType + '?include_adult=false&include_video=false&language=en-US&page='+ sivu + '&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(json => {
            const elokuva = json["results"][parseInt(Math.random() * json["results"].length)];
            console.log(elokuva);
            if (programType == "movie") {
                document.querySelector('#title').innerHTML = elokuva["title"];
            } else {
                document.querySelector('#title').innerHTML = elokuva["name"];
            }
            document.querySelector('#title').href = "https://www.themoviedb.org/" + programType + "/" + elokuva["id"];
            if (elokuva["poster_path"]!=null){
                document.querySelector('img').src="https://image.tmdb.org/t/p/w500" + elokuva["poster_path"];
                document.querySelector('#imagelink').href = "https://www.themoviedb.org/" + programType + "/" + elokuva["id"];
            } else {
                document.querySelector('img').src="./images/kansikuva.png";
                document.querySelector('#imagelink').href = "https://www.themoviedb.org/" + programType + "/" + elokuva["id"];
            }
            document.querySelector('img').style.border = "2px solid var(--light-foreground-color)"
            document.querySelector('div#content').style.background = "linear-gradient(rgba(255, 170, 0, 0.9), rgba(127, 127, 127, 0.2) 50%, rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original" + elokuva['backdrop_path']+")"
            document.querySelector('div#content').style.backgroundSize = "cover"
            document.querySelector('div#content').style.backgroundRepeat = "no-repeat"

            getWatchProviders(programType, elokuva["id"]);
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}



document.querySelector('#nappi1').addEventListener('click', () => {
    getSomethingToWatch("movie");
})
    /*
    let sivu = getRandomIntInRange(1, 500);
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + MOVIEDB_KEY
        }
    };
      
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+ sivu + '&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(json => {
            const elokuva = json["results"][parseInt(Math.random() * json["results"].length)];
            console.log(elokuva);
            document.querySelector('#title').innerHTML = elokuva["title"];
            document.querySelector('#title').href = "https://www.themoviedb.org/movie/" + elokuva["id"];
            if (elokuva["poster_path"]!=null){
            document.querySelector('img').src="https://image.tmdb.org/t/p/w500" + elokuva["poster_path"];
            } else {
                document.querySelector('img').src="./images/kansikuva.png";
            }
            document.querySelector('img').style.border = "2px solid var(--light-foreground-color)"
            document.querySelector('div#content').style.background = "linear-gradient(rgba(255, 170, 0, 0.9), rgba(127, 127, 127, 0.2) 50%, rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original" + elokuva['backdrop_path']+")"
            document.querySelector('div#content').style.backgroundSize = "cover"
            document.querySelector('div#content').style.backgroundRepeat = "no-repeat"
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
})
*/

document.querySelector('#nappi2').addEventListener('click', () => {
    getSomethingToWatch("tv"); })
    
    /*
    let sivu = getRandomIntInRange(1, 500);
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + MOVIEDB_KEY
        }
    };
      
    fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fi-FI&page=' + sivu + '&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(json => {
            const elokuva = json["results"][parseInt(Math.random() * json["results"].length)];
            console.log(elokuva);
            document.querySelector('#title').innerHTML = elokuva["name"];
            document.querySelector('#title').href = "https://www.themoviedb.org/tv/" + elokuva["id"];
            if (elokuva["poster_path"]!=null){
                document.querySelector('img').src="https://image.tmdb.org/t/p/w500" + elokuva["poster_path"];
            } else {
                document.querySelector('img').src="./images/kansikuva.png";
            }
            document.querySelector('img').style.border = "2px solid var(--light-foreground-color)"
            document.querySelector('div#content').style.background = "linear-gradient(rgba(255, 170, 0, 0.9), rgba(127, 127, 127, 0.2) 50%, rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original" + elokuva['backdrop_path']+")"
            document.querySelector('div#content').style.backgroundSize = "cover"
            document.querySelector('div#content').style.backgroundRepeat = "no-repeat"
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}) */