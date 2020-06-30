import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "4edce9d13c10ea772ac4f1b5024b18d6";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };

  getWeather = async (e) => {
    debugger;
    e.preventDefault();
    const city = e.target.elements.city.value;
    // const country = e.target.elements.country.value;

    // const api_call = await fetch(`
    // http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const api_call = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/find?type=link%252C%20accurate&units=imperial%252C%20metric&q=${city}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "e10ce1d3fdmshda1774f83327629p1102c9jsnd0d2e94cba85",
        },
      }
    );
    const data = await api_call.json();
    if (city) {
      this.setState({
        // temperature: data.main.temp,
        city: data.list[0].name,
        country: data.list[0].sys.country,
        humidity: data.list[0].coord,
        // coordinates: data.main.
        description: data.list[0].weather[0].description,
        whether: data.list[0].sys.country,
        temperature: data.list[0].main.temp,
        // main: list[0].whether[0].main,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values.",
      });
    }
  };

  // .then(response => {
  // 	console.log(response);
  // })
  // .catch(err => {
  // 	console.log(err);
  // });
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
