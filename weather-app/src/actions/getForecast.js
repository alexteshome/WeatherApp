import { GET_DAY_FORECAST } from './types';
import { GET_WEEK_FORECAST } from './types';
import { GET_ERRORS } from './types';
import { getCode } from 'country-list';

// Fetch today's forecast details, returns a promise.
const fetchDayForecast = async (city, country) => {
    if(city && country) {
        const Api_Key = '4f3ccf59baf3fe3b39327995560feed7';
        //convert country to country code for api url
        const countryCode = getCode(country);
        const weather_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${Api_Key}`);
        return weather_api_call.json();
           
    }
}

// Fetch the 5 day forecast details, returns a promise.
const fetchWeekForecast = async (city, country) => {
    if(city && country) {
        const Api_Key = '4f3ccf59baf3fe3b39327995560feed7';
        //convert country to country code for api url
        const countryCode = getCode(country);
        const forecast_api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${Api_Key}`);
        return forecast_api_call.json();
    }
}

//Asynchronous action creators, dispatches to reducer and is stored depending on action type
export const getDayForecast = location => dispatch => {
    fetchDayForecast(location.cityLoc, location.countryLoc)
        .then(res => {
            dispatch({
                type: GET_DAY_FORECAST,
                payload: res
            })})
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}

export const getWeekForecast = location => dispatch => {
    fetchWeekForecast(location.cityLoc, location.countryLoc)
        .then(res => 
            dispatch({
                type: GET_WEEK_FORECAST,
                payload: res.list
            }))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}
