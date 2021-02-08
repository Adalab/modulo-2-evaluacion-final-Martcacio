'use strict'

const nameElement = document.querySelector('.serie-name-js');
const imgElement = document.querySelector('.serie-img-js');
const button = document.querySelector('.search-button-js');
const seriesContainer = document.querySelector('.container-js');


let series = [];
let fav = [];



//Datos del Api
function getDataFromApi() {
    fetch(`http://api.tvmaze.com/search/shows?q=girls`)
        .then((response) => response.json())
        .then((data) => {
            for (const show of data) {
                console.log(show.show.name);
                console.log(show.show.image);
            }

        })
};


button.addEventListener('click', getDataFromApi());



//Carátulas de las series
function paintImgSerie() {
    if (serieCard.show.image === null) {
        seriesObject.image = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
        seriesObject.image = serieCard.show.image.medium;
    }
}
paintImgSerie();



//Render
function renderSeries() {
    let htmlCode = '';

    for (const serie of series) {
        htmlCode += `<li class="serie-card">`;
        htmlCode += `<img class="img" src="${show.show.image}" class="serie-img-js">`;
        htmlCode += `<h3 class="serie-name-js">${show.show.name}</h3>`;
        htmlCode += ` < /li>`;
    }

    seriesContainer.innerHTML = htmlCode;
}
renderSeries();



//Local Storage
/* 
function setFavSeries(){
 const stringFavSeries = JSON.stringify(favSeries);
 localStorage.setItem('favSeries', stringFavSeries);
}*/



//Start Api
getDataFromApi();