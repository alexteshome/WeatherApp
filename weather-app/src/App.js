import React from 'react';
import Titles from './components/titles';
import Search from './components/search';
import FiveDayForecast from './containers/fiveDayForecast';
import HourlyForecast from './containers/hourlyForecast';

import { Container, Row } from 'reactstrap';
class App extends React.Component{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    pressure: undefined,
    wind: undefined,
    cloudiness: undefined,
    description: undefined,
    icon: undefined,
    list: undefined,
    error: undefined
  }
  getWeather = async (e) => {

    e.preventDefault();
    const Api_Key = '4f3ccf59baf3fe3b39327995560feed7';
    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const weather_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const forecast_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${Api_Key}`);

    const weatherResponse = await weather_api_call.json();
    const forecastResponse = await forecast_api_call.json();

  
    if(city && country){
      this.setState({
        temperature: weatherResponse.main.temp - 273.15,
        city: weatherResponse.name,
        country: weatherResponse.sys.country,
        humidity: weatherResponse.main.humidity,
        pressure: weatherResponse.main.pressure,
        wind: weatherResponse.wind.speed,
        cloudiness: weatherResponse.clouds.all,
        description: weatherResponse.weather[0].description,
        list: forecastResponse.list,
        error: ""
      })
    }else{
        this.setState({
        error: <i>Please enter the values...</i>
      })
    }
  }

  render(){
    const dayForecastTitle = () => {
      if(typeof this.state.city !== 'undefined' || typeof this.state.country !== 'undefined') {
        return "24 Hour Forecast";
      }
    }
    const weekForecastTitle = () => {
      if(typeof this.state.city !== 'undefined' || typeof this.state.country !== 'undefined') {
        return "5 Day Forecast";
      }
    }
    return(
      <div  style={{fontFamily: 'Open Sans', color: 'white'}}>
        <Titles />
        <hr style={{width: '95%', border: '1px solid white', borderRadius: '5px'}}/>
        <div style={{paddingLeft: '2%'}}><Search loadWeather={this.getWeather}/></div>
        <br/>
        <h2 style={{textAlign: 'center'}}>{dayForecastTitle()}</h2>
        <Container fluid>
          <HourlyForecast 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            wind={this.state.wind}
            cloudiness={this.state.cloudiness}
            description={this.state.description}
            list={this.state.list}
            error={this.state.error} />
          <br/>
          <h2 style={{textAlign: 'center'}}>{weekForecastTitle()}</h2>
          <Row>
          <FiveDayForecast list = {this.state.list}/>
          </Row>
        </Container>
        <br/>
      </div>

   )
  }
}
export default App;