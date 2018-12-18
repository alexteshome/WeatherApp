import React from 'react';
import WeatherCard from '../components/WeatherCard';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

const FiveDayForecast = (props) => {
    let row = [];
    let forecastList = props.list;
    if(typeof forecastList == 'undefined') {
    return ""
    }
    //Push first weather card for first day
    row.push(
    <Col xs={{size:6, offset: 3}} md={{size: 2, offset: 1}} 
    key={0}>
    <WeatherCard
        date={forecastList[0].dt_txt}
        temperature={forecastList[0].main.temp - 273.15}
        icon={forecastList[0].weather[0].icon}
        description={forecastList[0].weather[0].description}
    /></Col>);
    const date = new Date();
    //Filter out today's weather information from the list
    const newforecastList = forecastList.filter(element => date.getDay() !== new Date(element.dt_txt).getDay());
    //Loop through 4 more days of forecast information and push with the WeatherCard component for every day
    for(let i=1 ; i <= 4 ; i++) {
    row.push(<Col xs={{size:6, offset: 3}} md={{size: 2, offset: 0}} key={i+1}>
    <WeatherCard
        date={newforecastList[i*8-1].dt_txt}
        temperature={newforecastList[i*8-1].main.temp - 273.15}
        icon={newforecastList[i*8-1].weather[0].icon}
        description={newforecastList[i*8-1].weather[0].description}
    /></Col>);
    }
    //Display all 5 cards from array
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>5 Day Forecast</h2>
            <Row>{row}</Row>
        </div>
    );
}


// Pass in the list called from the weather api in the redux state as a prop
const mapStateToProps = (state) => ({
    list: state.weekForecast.list,  
})
export default connect(mapStateToProps)(FiveDayForecast);