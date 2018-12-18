import { combineReducers } from 'redux';
import dayForecastReducer from './dayForecastReducer';
import weekForecastReducer from './weekForecastReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    dayForecast: dayForecastReducer,
    weekForecast: weekForecastReducer,
    error: errorReducer
});