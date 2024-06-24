import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then((response) => response.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        setResult("Temperature in " + city + ": " + Math.round(celcius) + "°C");
      })
      .catch((error) => console.log(error));
    setCity("");
  };

  return (
    <div className="container mt-5">
      <center>
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={submitHandler} className="form-inline justify-content-center mt-3">
              <div className="form-group mb-2">
                <input
                  size="30"
                  type="text"
                  name="city"
                  onChange={changeHandler}
                  value={city}
                  className="form-control"
                  placeholder="Enter city name"
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2 ml-2">
                Get Temperature
              </button>
            </form>
            <br />
            {result && (
              <div className="alert alert-info mt-4" role="alert">
                <h1>{result}</h1>
              </div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
