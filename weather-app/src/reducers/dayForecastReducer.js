import { GET_DAY_FORECAST } from '../actions/types';
import { getName } from 'country-list';


export default function(state = {}, action ) {
    switch(action.type) {
        case GET_DAY_FORECAST:
            return {
                ...state,
                temperature: action.payload.main.temp - 273.15,
                city: action.payload.name,
                // getName returns the full name of country from its country code
                country: getName(action.payload.sys.country),
                humidity: action.payload.main.humidity,
                pressure: action.payload.main.pressure,
                wind: action.payload.wind.speed,
                cloudiness: action.payload.clouds.all,
                description: action.payload.weather[0].description
                
            };
        default: 
            return state;
    }
}
 