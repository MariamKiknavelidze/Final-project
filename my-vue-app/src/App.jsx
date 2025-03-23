import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "./Components/Store";
import Search from "./Components/Search";
import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import PageNotFound from "./Components/NotFound";

const options = [
  { value: "Georgia", label: "Georgia" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Germany", label: "Germany" },
  { value: "Italy", label: "Italy" },
  { value: "Country is not defined", label: "Country is not defined" },
];
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "550px",
    borderRadius: "8px",
    boxShadow: "none",
    textAlign: "left",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    backgroundColor: state.isSelected ? "lightgrey" : "white ",
  }),
};
const UniversityList = ({ universities, selectedCountry }) => {
  return (
    <div className="university-list">
      {universities.length > 0 ? (
        universities.map((university, index) => (
          <div className="university-item" key={index}>
            <h3>{university.name}</h3>
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </div>
        ))
      ) : (
        <p>
          {" "}
          {selectedCountry &&
            universities.length === 0 &&
            "უნივერსიტეტები არ იძებნება "}{" "}
        </p>
      )}
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.temperature);
  // const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [universities, setUniversities] = useState([]);
  const weatherURL =
    "https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&current_weather=true&temperature_unit=celsius";

  useEffect(() => {
    axios
      .get(
        `${weatherURL}?latitude=41.7151&longitude=44.8271&current_weather=true&temperature_unit=celsius`
      )
      .then((response) => {
        dispatch(setWeather(response.data.current_weather.temperature));
      })
      .catch((err) => {
        console.error("Error fetching weather data", err);
      });
  }, [dispatch]);
  function fetchCountries(countryName) {
    fetch(`http://universities.hipolabs.com/search?country=${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        setUniversities(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <Router>
    <div className="App">
      <header style={{ padding: "10px", backgroundColor: "pink" }}></header>
      <h2>Weather in Tbilii: </h2>
      <h1 style={{ fontSize: "20px" }}> Countries & Universities </h1>
      <Select options={options} styles={customStyles} onChange={handleChange} />
      <Search
        countries={country}
        fetchCountries={fetchCountries}
        selectedCountry={selectedCountry}
      />

      <UniversityList
        universities={universities}
        selectedCountry={selectedCountry}
      />
     <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    path="*"
                    element={<PageNotFound />}
                />
            </Routes>
      <Router>
    </div>
  );
}
export default App;