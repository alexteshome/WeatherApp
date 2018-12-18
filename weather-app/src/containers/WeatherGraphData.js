import React from 'react'
import WeatherGraph from '../components/WeatherGraph';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';

const WeatherGraphData = (props) => {
    if(typeof props.list === 'undefined') {
        return "";
    }
    let data = []; 
    let date;
    let time;
    let temperature;

    //Loop through the current day for every 3 hours, store the temperture and time in an array
    for (let i =0; i < 9; i++) {
        //Convert to user's timezone
        date = new Date(props.list[i].dt_txt + ' UTC')
        time = dateFormat(date, "H:MM")
        //Kelvin to Celsius
        temperature = Math.round(props.list[i].main.temp - 273.15);
        data.push({
            time,
            temperature
        })
    };
    return(
        <WeatherGraph data = {data}/>
        )
}

const mapStateToProps = (state) => ({
    list: state.weekForecast.list,  
})
export default connect(mapStateToProps)(WeatherGraphData);

