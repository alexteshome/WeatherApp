import React from 'react';
import Weather from '../components/weather';
import WeatherGraph from '../components/weatherGraph';
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
        console.log(this.props.list)
        for (let i =0; i < 9; i++) {
            date = new Date(this.props.list[i].dt_txt + ' UTC')
            time = dateFormat(date, "H:MM")
            temperature = Math.round(this.props.list[i].main.temp - 273.15);
            data.push({
                time,
                temperature
            })
        };

        return(<Row>
            <Col xs={{size: 8, offset: 0}} lg={{size: 2, offset: 1}}>
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
            <WeatherGraph data = {data}/>
            </Col>
        </Row>)
    }
} 

export default HourlyForecast;
