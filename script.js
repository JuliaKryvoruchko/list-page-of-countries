//URL
const getAllCountriesUrl = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";
const getAllRegionsUrl = "https://restcountries.com/v3.1/all?fields=region";

window.onload = async function () {
    let regions = await getRegionsByUrl();
    let countries = await getAllCountriesByUrl();
    populateCountries(countries);
    populateRegions(regions);
}

async function getRegionsByUrl() {
    const response = await fetch(getAllRegionsUrl);
    if (response.status == 404) {
        console.log(response.status);
    }
    else {
        let data = await response.json();
        let regions = data.map(r => r.region);
        let dictinctRegions = [...new Set(regions)];
        return dictinctRegions;
    }
}

async function getAllCountriesByUrl() {
    const response = await fetch(getAllCountriesUrl);

    if (response.status == 404) {
        console.log(response.status);
    }
    else {
        let data = await response.json();
        let countries = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let name = element.name.common;
            let population = element.population;
            let flag = element.flags.png;
            let region = element.region;
            let capital = element.capital[0];
            let country = {
                name: name,
                population: population,
                imgUrl: flag,
                region: region,
                capital: capital
            };
            countries.push(country);
        }
        return countries;
    }
}

async function getAllCountriesByName(){
    let countryName = document.getElementById('inputSearch').value;
    if (countryName == ""){
        return await getAllCountriesByUrl();
    }
    const findCountryByNameUrl = `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,capital`;

    const response = await fetch(findCountryByNameUrl);
    if (response.status == 404) {
        console.log(response.status);
    }
    else {
        let data = await response.json();
        let countries = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let name = element.name.common;
            let population = element.population;
            let flag = element.flags.png;
            let region = element.region;
            let capital = element.capital[0];
            let country = {
                name: name,
                population: population,
                imgUrl: flag,
                region: region,
                capital: capital
            };
            countries.push(country);
        }
        return countries;
    }
}

async function getAllCountriesByRegion(){
    let region = document.getElementById('select').value;
    const findCountryByRegionUrl = `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`;

    const response = await fetch(findCountryByRegionUrl);
    if (response.status == 404) {
        console.log(response.status);
    }
    else {
        let data = await response.json();
        let countries = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let name = element.name.common;
            let population = element.population;
            let flag = element.flags.png;
            let region = element.region;
            let capital = element.capital[0];
            let country = {
                name: name,
                population: population,
                imgUrl: flag,
                region: region,
                capital: capital
            };
            countries.push(country);
        }
        return countries;
    }
}

function populateRegions(regions) {
    let select = document.getElementById("select");
    for (let index = 0; index < regions.length; index++) {
        const element = regions[index];
        let template = getRegionHtmlTemplate(element);
        select.innerHTML += template;
    }
}

function populateCountries(countries) {
    let main = document.getElementsByTagName('main')[0];
    for (let index = 0; index < countries.length; index++) {
        const element = countries[index];
        let template = getCountryHtmlTemplate(element);
        main.innerHTML += template;
    }
}


function getRegionHtmlTemplate(region) {
    return `<option value="${region}">${region}</option>`
}

function getCountryHtmlTemplate(item) {
    return ` <div class="country">
    <img src="${item.imgUrl}" alt="#" class="flag">
    <div class="information-about-country">
        <h2 class="country-name">${item.name}</h2>
        <div class="population">
            <h3 class="name">Population:</h3>
            <p class="value">${item.population}</p>
        </div>
        <div class="region">
            <h3 class="name">Region:</h3>
            <p class="value">${item.region}</p>
        </div>
        <div class="capital">
            <h3 class="name">Capital:</h3>
            <p class="value">${item.capital}</p>
        </div>
    </div>
</div>`
}

function clearMain() {
    let main = document.getElementsByTagName('main')[0];
    main.innerHTML = '';
}

async function filter() {
    clearMain();
    let countries = await getAllCountriesByName();
    let region = document.getElementById('select').value;
    if(region == 'region'){
        return;
    }
    else{
        countries = countries.filter((country) => country.region.startsWith(region));
        populateCountries(countries);
    }
}

async function select() {
    clearMain();
    let countries = await getAllCountriesByRegion();
    let countryName = document.getElementById('inputSearch').value;
    if(countryName == ""){
        populateCountries(countries);
    }
    else{
        countries = countries.filter((country) => country.name.toLowerCase().startsWith(countryName.toLowerCase()));
        populateCountries(countries);
    }

}
//dark and light theme
const theme = document.getElementById('theme');
const changeTheme = document.getElementById('mode');
changeTheme.onchange = (e) => {
    if (changeTheme.checked === false) {
        console.log("Checked")
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
        window.localStorage.setItem('mode', 'light');
    } else {
        console.log("Not Checked")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        window.localStorage.setItem('mode', 'dark');
    }
}
const mode = window.localStorage.getItem('mode');
if (mode == 'dark') {
    changeTheme.checked = true;
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
}

if (mode == 'light') {
    changeTheme.checked = false;
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
}