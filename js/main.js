'use strict'

let series = [];
let favs = [];

//Datos del Api
function getDataFromApi(searchValue) {
    fetch(`http://api.tvmaze.com/search/shows?q=` + searchValue)
        .then((response) => response.json())
        .then((data) => {
            series = data;
            renderSeries()
        })
    setFavs();
};

//Search
const button = document.querySelector('.search-button-js');
const inputElement = document.querySelector('.search-input-js');
const formElement = document.querySelector('.form-js');

function handleSubmit(ev) {
    ev.preventDefault();
}

function handleSearch() {
    getDataFromApi(inputElement.value);
    setFavs();
}
formElement.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleSearch);

//Render
function renderSeries() {
    let htmlCode = '';

    for (const serie of series) {

        let serieImage = '';
        if (serie.show.image === null) {
            serieImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            serieImage = serie.show.image.medium;
        };

        if (isFav(serie)) {
            htmlCode += `<li class="serie-card fav serie-card-js" id="${serie.show.id}">`;
        } else {
            htmlCode += `<li class="serie-card normal serie-card-js" id="${serie.show.id}">`;
        }
        htmlCode += `<img class="img" src="${serieImage}" class="serie-img">`;
        htmlCode += `<p class="serie-name">${serie.show.name}</p>`;
        htmlCode += ` </li>`;
    }
    const seriesContainer = document.querySelector('.container-js');

    seriesContainer.innerHTML = htmlCode;

    const serieItems = document.querySelectorAll('.serie-card-js');
    for (const serieItem of serieItems) {
        serieItem.addEventListener('click', handleSerie);
    }
    setFavs();
}

//Definir paletas favoritas
function isFav(serie) {
    const favFound = favs.find((fav) => {
        return fav.show.id === serie.show.id;
    });
    if (favFound === undefined) {
        return false
    } else {
        return true
    };
}


//Listen series
function handleSerie(ev) {
    const clickedSerieId = ev.currentTarget.id;
    const favsFound = favs.find((fav) => {
        return fav.show.id === parseInt(clickedSerieId);
    });
    if (favsFound === undefined) {
        const serieFound = series.find((serie) => {
            return serie.show.id === parseInt(clickedSerieId);
        });

        //Push (cojo la paleta)
        favs.push(serieFound);
        renderSeries();
    } else {
        const favsFoundIndex = favs.findIndex((fav) => {
            return fav.show.id === parseInt(clickedSerieId);
        });
        favs.splice(favsFoundIndex, 1);
    }
    setFavs();
    renderSeries();
    renderFavSeries();
};



//Mis favs 
function renderFavSeries() {
    let htmlCode = '';

    for (const serieFav of seriesFav) {

        let serieFavImage = '';
        if (serieFav.show.image === null) {
            serieFavImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            serieFavImage = serieFav.show.image.medium;
        };

        htmlCode += `<li class="seriefav-card normal seriefav-card-js" id="${serieFav.show.id}">`;
        htmlCode += `<img class="img" src="${serieFavImage}" class="serie-img">`;
        htmlCode += `<p class="serie-name">${serieFav.show.name}</p>`;
        htmlCode += ` </li>`;
    }
    const seriesFavContainer = document.querySelector('.container-fav-js');

    seriesFavContainer.innerHTML = htmlCode;
}


//Local Storage
function setFavs() {
    const stringyFavs = JSON.stringify(favs);
    localStorage.setItem('favs', stringyFavs);
};


function getFavs() {
    const searchValue = localStorage.getItem('searchvalue');
    if (searchValue === null) {
        getDataFromApi('girls');
        inputElement.value = '';
    } else {
        getDataFromApi(searchValue);
        inputElement.value = searchValue;
    }
};


getFavs();