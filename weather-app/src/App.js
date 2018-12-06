import React from 'react';
import Titles from './components/titles';
import ReportForm from './containers/ReportForm';
import FiveDayForecast from './containers/fiveDayForecast';
import HourlyForecast from './containers/hourlyForecast';
import { getCode, getName } from 'country-list';

import { Container, Row } from 'reactstrap';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      temperature: undefined,
      humidity: undefined,
      pressure: undefined,
      wind: undefined,
      cloudiness: undefined,
      description: undefined,
      icon: undefined,
      list: undefined,
      error: undefined
    }
    this.fetchWeather = this.fetchWeather.bind(this);
  }
  fetchWeather = async (city, country) => {
    if(city && country) {
      const Api_Key = '4f3ccf59baf3fe3b39327995560feed7';
      
      const countryCode = getCode(country);

      const weather_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${Api_Key}`);
      const forecast_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${Api_Key}`);
      return { 
        weatherResponse : await weather_api_call.json(),
        forecastResponse : await forecast_api_call.json()
      }
    }
  }

  setReportLocation = (location) => {
    this.fetchWeather(location.cityLoc, location.countryLoc)
    .then(data =>{
      this.setState({
        temperature: data.weatherResponse.main.temp - 273.15,
        city: data.weatherResponse.name,
        country: getName(data.weatherResponse.sys.country),
        humidity: data.weatherResponse.main.humidity,
        pressure: data.weatherResponse.main.pressure,
        wind: data.weatherResponse.wind.speed,
        cloudiness: data.weatherResponse.clouds.all,
        description: data.weatherResponse.weather[0].description,
        list: data.forecastResponse.list,
        error: ""
      })})
    .catch(reason => console.log(reason.message))
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
        <div style={{width: '35%', paddingLeft: '2.5%'}}><ReportForm setReportLocation={this.setReportLocation} /></div>
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