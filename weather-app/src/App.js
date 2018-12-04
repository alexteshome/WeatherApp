import React from 'react';
import Titles from './components/titles';
import Search from './components/search';
import Weather from './components/weather';
import WeatherCard from './components/weatherCard';
import WeatherGraph from './components/weatherGraph';
import { Container, Row, Col } from 'reactstrap';
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
  weatherForecast = () => {
    let rows = [];
    let forecastList = this.state.list;
    if(typeof forecastList == 'undefined') {
      return ""
    }
    rows.push(
    <Col xs={{size:6, offset: 3}} md={{size: 2, offset: 1}} 
      key={0}>
      <WeatherCard
        date={forecastList[0].dt_txt}
        temperature={forecastList[0].main.temp - 273.15}
        icon={forecastList[0].weather[0].icon}
        description={forecastList[0].weather[0].description}
      /></Col>);
    const date = new Date();
    const newforecastList = forecastList.filter(element => date.getDay() !== new Date(element.dt_txt).getDay());
    
    for(let i=1 ; i <= 4 ; i++) {
      rows.push(<Col xs={{size:6, offset: 3}} md={{size: 2, offset: 0}} key={i+1}>
      <WeatherCard
        date={newforecastList[i*8-1].dt_txt}
        temperature={newforecastList[i*8-1].main.temp - 273.15}
        icon={newforecastList[i*8-1].weather[0].icon}
        description={newforecastList[i*8-1].weather[0].description}
      /></Col>);
    }
    return rows;
  } 
  currentWeather = () => {
    if(typeof this.state.city !== 'undefined' || typeof this.state.country !== 'undefined') {
        return(<Row>
          <Col xs={{size: 8, offset: 0}} lg={{size: 2, offset: 1}}>
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            wind={this.state.wind}
            cloudiness={this.state.cloudiness}
            description={this.state.description}

          error={this.state.error} />
          </Col>
          <Col lg={{size: 8, offset: 0}} xs='12'>
          <WeatherGraph dataList = {this.state.list}/>
          </Col>
        </Row>)
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
          {this.currentWeather()}
          <br/>
          <h2 style={{textAlign: 'center'}}>{weekForecastTitle()}</h2>
          <Row>
            {this.weatherForecast()}
          </Row>
        </Container>
        <br/>
      </div>

   )
  }
}
export default App;