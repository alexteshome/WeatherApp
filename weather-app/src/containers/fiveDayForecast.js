import React from 'react';
import WeatherCard from '../components/weatherCard';
import { Col } from 'reactstrap';

class FiveDayForecast extends React.Component{
  render() {
    let rows = [];
    let forecastList = this.props.list;
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
} 

export default FiveDayForecast;