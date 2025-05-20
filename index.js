let myForm = document.getElementById("my-form");
let countryCard = document.getElementById("country-card");
let loadingState = document.getElementById("loading-state");
countryCard.style.display = "none";
loadingState.style.display = "none";

let countryInitialName = document.getElementById("countryInitialName");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loadingState.style.display = "block";
        countryCard.style.display = "none";
      countryInitialName.style.display = "none";

  let userInputCountryName =
    document.getElementById("input-country-name").value;

  function loadNews(countryName) {
    return new Promise(function (resolve, reject) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject("Invalid country Name");
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => console.log(error));
    });
  }

  loadNews(userInputCountryName)
    .then((response) => {
      console.log(response);
      let borders = response[0].borders ?? [];
      borders.forEach((border) => console.log(border));
      let languages = response[0].languages ?? {};
      Object.values(languages).forEach((language) => console.log(language));

      let timezone = response[0].timezones ?? [];
      timezone.forEach((time) => console.log(time));
      const country = {
        countryFlag: response[0].flags.png,
        name: response[0].name.common,
        capital: response[0].capital[0],
        region: response[0].region,
        subRegion: response[0].subregion,
        borders: borders,
        languages: languages,
        population: response[0].population,
        totalArea: response[0].area,
        timeZone: timezone,
        startOfWeek: response[0].startOfWeek,
      };

      let countryFlag = document.getElementById("country-flag");
      let countryName = document.getElementById("country-name");
      let capital = document.getElementById("capital");
      let region = document.getElementById("region");
      let subRegion = document.getElementById("sub-region");
      let border = document.getElementById("borders");
      let language = document.getElementById("languages");
      let population = document.getElementById("population");
      let area = document.getElementById("area");
      let timeZone = document.getElementById("time-zone");
      let startOfWeek = document.getElementById("start-of-week");
      setTimeout(() => {
        countryCard.style.display = "block";
        loadingState.style.display = "none";
      }, 1500);

      countryInitialName.style.display = "none";
      countryFlag.src = country.countryFlag;
      countryName.innerText = ` country Name : ${country.name} `;
      capital.innerText = ` capital Name : ${country.capital} `;
      region.innerText = ` Region : ${country.region} `;
      subRegion.innerText = ` sub Region : ${country.subRegion} `;
      border.innerText = ` borders : ${Object.values(country.borders).join(
        ", "
      )} `;
      language.innerText = ` Languages :  ${Object.values(
        country.languages
      ).join(", ")} `;
      population.innerText = ` Population : ${country.population} `;
      area.innerText = ` area : ${country.totalArea}`;
      timeZone.innerText = ` time zone : ${country.timeZone} `;
      startOfWeek.innerText = ` start of week : ${country.startOfWeek} `;
    })
    .catch((error) => {
      console.log(error);
      countryInitialName.style.display = "none";
      countryCard.style.display = "none";
      setTimeout(() => {
      countryInitialName.innerText = "invalid country name !";
      countryInitialName.style.display = "block";
      countryInitialName.style.color = "red";
      loadingState.style.display = "none";
        }, 2000);
    });

  event.target.reset();
});
