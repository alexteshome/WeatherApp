import React from 'react';
import Weather from './Weather';
import WeatherGraphData from '../containers/WeatherGraphData';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

const DayForecast = (props) => {
    // Do not render until all weather information is available
    if (typeof props.city === 'undefined' || typeof props.list === 'undefined') {
        return '';
    }
    return(
    <div>
        <h2 style={{textAlign: 'center'}}>24 Hour Forecast</h2>
        <Row>
            <Col xs={{size: 8, offset: 0}} lg={{size: 2, offset: 1}}>
                {/* General weather information for today */}
                <Weather/>
            </Col>
            <Col lg={{size: 8, offset: 0}} xs='12'>
                {/* Send todays forecast data to display it in a line graph form */}
                <WeatherGraphData/>
            </Col>
        </Row>
    </div>)
} 
const mapStateToProps = (state) => ({
    city: state.dayForecast.city,
    list: state.weekForecast.list
})
export default connect(mapStateToProps)(DayForecast);