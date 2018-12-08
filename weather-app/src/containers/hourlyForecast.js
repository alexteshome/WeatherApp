import React from 'react';
import Weather from '../components/Weather';
import WeatherGraph from '../components/WeatherGraph';
import { Col, Row } from 'reactstrap';
import dateFormat from 'dateformat';

class HourlyForecast extends React.Component{
    render() {
        if(typeof this.props.city === 'undefined' || typeof this.props.country === 'undefined') {
            return "";
        }
        let data = []; 
        let date;
        let time;
        let temperature;

        //Loop through the current day for every 3 hours, store the temperture and time in an array
        for (let i =0; i < 9; i++) {
            //Convert to user's timezone
            date = new Date(this.props.list[i].dt_txt + ' UTC')
            time = dateFormat(date, "H:MM")
            //Kelvin to Celsius
            temperature = Math.round(this.props.list[i].main.temp - 273.15);
            data.push({
                time,
                temperature
            })
        };

        return(<Row>
            <Col xs={{size: 8, offset: 0}} lg={{size: 2, offset: 1}}>
            {/* General weather information for today */}
            <Weather
                temperature={this.props.temperature}
                city={this.props.city}
                country={this.props.country}
                humidity={this.props.humidity}
                pressure={this.props.pressure}
                wind={this.props.wind}
                cloudiness={this.props.cloudiness}
                description={this.props.description}
                error={this.props.error} />
            </Col>
            <Col lg={{size: 8, offset: 0}} xs='12'>
            {/* Send todays forecast data to display it in a line graph form */}
            <WeatherGraph data = {data}/>
            </Col>
        </Row>)
    }
} 

export default HourlyForecast;
