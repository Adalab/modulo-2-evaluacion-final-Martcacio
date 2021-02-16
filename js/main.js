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
        htmlCode += `<p class="serie-status">${serie.show.status}</p>`
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

    for (const fav of favs) {

        let favImage = '';
        if (fav.show.image === null) {
            favImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
            favImage = fav.show.image.medium;
        };
        htmlCode += `<li class="seriefav-card fav seriefav-card-js" id="${fav.show.id}">`;
        htmlCode += `<img class="img-fav" src="${favImage}" class="serie-img">`;
        htmlCode += `<p class="serie-name">${fav.show.name}</p>`;
        htmlCode += `<button class="button-cross cross-js" id="${fav.show.id}"><i class="fas fa-backspace"></i></button>`
        htmlCode += ` </li>`;

    }
    const seriesFavContainer = document.querySelector('.container-fav-js');

    seriesFavContainer.innerHTML = htmlCode;
    removeCrossButton();

}


//Delete all
function deleteAll() {

    const deleteAll = document.querySelector('.delete-js');
    deleteAll.addEventListener('click', handleDelete);
}
deleteAll();


function handleDelete() {
    localStorage.removeItem('favs');
    favs = [];
    renderSeries();
    renderFavSeries();

}





//Remove x
function removeCrossButton() {
    const removeCrosses = document.querySelectorAll('.cross-js');
    localStorage.removeItem('favs');
    for (const removeCross of removeCrosses) {
        removeCross.addEventListener('click', handleRemoveCross);
    }

}



function handleRemoveCross(ev) {

    const clickedRemoveId = parseInt(ev.currentTarget.id)
    const deleteIndex = favs.findIndex((fav) => fav.show.id === clickedRemoveId);
    if (deleteIndex !== -1) {
        favs.splice(deleteIndex, 1);
        renderFavSeries();
        renderSeries();
    }

}




//Local Storage
function setFavs() {
    const stringyFavs = JSON.stringify(favs);
    localStorage.setItem('favs', stringyFavs);
};

function getFavs() {
    const favsStorage = localStorage.getItem('favs');
    if (favsStorage !== null) {
        favs = JSON.parse(favsStorage);
        renderFavSeries();
    }
};


getFavs();
getDataFromApi('girls');


//Log
const logFavs = document.querySelector('.log-js');

function handleLogFavs() {
    for (const fav of favs) {
        console.log(fav.show.name);
    }
}

logFavs.addEventListener('click', handleLogFavs);