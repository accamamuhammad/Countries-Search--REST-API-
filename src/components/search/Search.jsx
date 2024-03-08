import data from "./data";
import { useState, useEffect } from "react";
import searchCSS from "./Search.module.css";

const Search = () => {
  /* 1. All useState */
  const [theme, setTheme] = useState(false);
  const [filter, setFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [allCountries, setAllCountries] = useState(data);
  const [currentRegion, setCurrentRegion] = useState(allCountries);

  /* 2. Empty array for each region */
  const asianCountries = [];
  const polarCountries = [];
  const africaCountries = [];
  const oceaniaCountries = [];
  const americanCountries = [];
  const europeanCountries = [];

  /* 3. Toggle to toggle between light and dark mode */
  const toggleTheme = () => {
    setTheme(!theme);
  };

  /* 4. Toggle to toggle between the filter being on and off */
  const toggleFilter = () => {
    setFilter(!filter);
  };

  /* 5. for loop to iterate over all the countries */
  for (let i = 0; i < allCountries.length; i++) {
    const country = allCountries[i];
    if (allCountries[i].region === "Africa") {
      africaCountries.push(country);
    } else if (allCountries[i].region === "Americas") {
      americanCountries.push(country);
    } else if (allCountries[i].region === "Asia") {
      asianCountries.push(country);
    } else if (allCountries[i].region === "Europe") {
      europeanCountries.push(country);
    } else if (allCountries[i].region === "Oceania") {
      oceaniaCountries.push(country);
    } else {
      polarCountries.push(country);
    }
  }

  /* 6. if statements to add them to thier usestate */
  const filterRegion = (region) => {
    for (let i = 0; i < allCountries.length; i++) {
      if (region === "Africa") {
        setCurrentRegion(africaCountries);
      } else if (region === "America") {
        setCurrentRegion(americanCountries);
      } else if (region === "Asia") {
        setCurrentRegion(asianCountries);
      } else if (region === "Europe") {
        setCurrentRegion(europeanCountries);
      } else if (region === "Oceanic") {
        setCurrentRegion(oceaniaCountries);
      }
    }
  };

  /* 7. useEffect to avoid pointless rerendering */
  useEffect(() => {
    /* 8. The first letter of the users is turned to uppercase */
    const capped = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setSearchValue(capped);
    /* 9. check for country based on user input  */
    if (searchValue !== "") {
      for (let i = 0; i < allCountries.length; i++) {
        const country = allCountries[i];
        if (searchValue !== "") {
          const filteredCountries = allCountries.filter(
            (country) => country.name === searchValue
          );

          if (filteredCountries.length > 0) {
            setCurrentRegion(filteredCountries);
          } else {
            setCurrentRegion(allCountries);
          }
        } else {
          setCurrentRegion(allCountries);
        }
      }
    }
  }, [inputValue, searchValue, allCountries]);

  return (
    <div
      className={`${searchCSS.wrapper} ${
        theme ? searchCSS.mainLightBg : searchCSS.mainDarkBg
      }`}
    >
      <nav className={`${theme ? searchCSS.navLightBg : searchCSS.navDarkBg}`}>
        <h1
          className={`${theme ? searchCSS.textDarkBg : searchCSS.textLightBg}`}
        >
          Where in the world?
        </h1>
        <div onClick={() => toggleTheme()}>
          <div>
            <img
              src={
                theme
                  ? "/src/assets/moon-regular.svg"
                  : "/src/assets/moon-solid.svg"
              }
              alt="icon"
            />
          </div>
          <p
            className={`${
              theme ? searchCSS.textDarkBg : searchCSS.textLightBg
            }`}
          >
            Dark Mode
          </p>
        </div>
      </nav>
      <section
        className={`${theme ? searchCSS.mainLightBg : searchCSS.mainDarkBg}`}
      >
        <div>
          <div>
            <button
              onClick={() => searchByName()}
              className={`${
                theme ? searchCSS.buttonBtnLightBg : searchCSS.inputBtnDarkBg
              }`}
            >
              <img
                src={
                  theme
                    ? "/src/assets/magnifying-glass-solid (1).svg"
                    : "/src/assets/magnifying-glass-solid.svg"
                }
                alt=""
              />
            </button>
            <input
              type="search"
              value={inputValue}
              placeholder="Search for a country..."
              onChange={(e) => setInputValue(e.target.value)}
              className={`${
                theme ? searchCSS.inputBtnLightBg : searchCSS.inputBtnDarkBg
              }`}
            />
          </div>
          <div
            id="select"
            value={selectValue}
            onClick={() => toggleFilter()}
            className={`${searchCSS.selectCountry} ${
              filter ? searchCSS.filterOn : searchCSS.filterOff
            } ${theme ? searchCSS.inputBtnLightBg : searchCSS.inputBtnDarkBg}`}
          >
            <p>Filter by region</p>
            <img
              src={
                theme
                  ? "/src/assets/arrow-down-sign-to-navigate.png"
                  : "/src/assets/arrow-204-16.png"
              }
              alt="dropdown"
            />
            <ul
              className={`${searchCSS.selectCountry} ${
                theme ? searchCSS.SelectLightBg : searchCSS.SelectDarkBg
              }`}
            >
              <li onClick={() => filterRegion("Africa")}>Africa</li>
              <li onClick={() => filterRegion("America")}>America</li>
              <li onClick={() => filterRegion("Asia")}>Asia</li>
              <li onClick={() => filterRegion("Europe")}>Europe</li>
              <li onClick={() => filterRegion("Oceanic")}>Oceanic</li>
            </ul>
          </div>
        </div>
      </section>
      <div
        className={`${searchCSS.Allcountries} ${
          theme ? searchCSS.mainLightBg : searchCSS.mainDarkBg
        }`}
      >
        {/* .map function was used to iterate over all items in the array */}
        {currentRegion.map((country) => (
          <div
            key={country.name}
            className={`${theme ? searchCSS.navLightBg : searchCSS.navDarkBg}`}
          >
            <img src={country.flag} alt={`Flag of ${country.name}`} />{" "}
            <h1
              className={`${theme ? searchCSS.blackText : searchCSS.lightText}`}
            >
              {country.name}
            </h1>
            <p
              className={`${theme ? searchCSS.blackText : searchCSS.lightText}`}
            >
              Population: <span>{country.population}</span>
            </p>
            <p
              className={`${theme ? searchCSS.blackText : searchCSS.lightText}`}
            >
              Region: <span>{country.region}</span>
            </p>
            <p
              className={`${theme ? searchCSS.blackText : searchCSS.lightText}`}
            >
              Capital: <span>{country.capital}</span>
            </p>
          </div>
        ))}
        <h1 className={searchCSS.attribute}>Built by accama</h1>
      </div>
    </div>
  );
};
export default Search;
