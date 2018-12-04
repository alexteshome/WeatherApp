import React from 'react';

const Weather = (props) => {
 
  return(
    
      <div>
        {props.country && props.city && <h5>Location: {props.city},    {props.country}</h5>}
        {props.temperature && <h5>Temperature: {Math.round(props.temperature) + '\xB0C'}</h5>}
        {props.humidity && <h5>Humidity: {props.humidity} %</h5>}
        {props.pressure && <h5>Pressure: {props.pressure} hPA</h5>}
        {props.wind && <h5>Wind: {props.wind} m/s</h5>}
        {props.cloudiness && <h5>Cloudiness: {props.cloudiness} %</h5>}
        {props.description && <h5>Conditions:  {props.description}</h5>}
        {props.error && <h5>{props.error}</h5>}
     </div >
    
   )
}
export default Weather;