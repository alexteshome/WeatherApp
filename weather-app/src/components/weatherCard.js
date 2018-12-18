import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';

const WeatherCard = (props) => {
    const date = new Date(props.date);
    const imgStyle = {
        display:'inline-block', 
        margin: '0 auto',
        minWidth: '25%'
    };
    const cardStyle = {
        boxShadow: '3px 5px black',
        background: 'transparent',
        display: 'inline-flex',
        width: '100%'
    }
    return(
    <div><b>
      <Card body className="text-center" style={cardStyle}>
        <CardTitle>{date.toString().split(' ')[0]}</CardTitle>
        <CardSubtitle>{date.toString().split(' ')[1] + " " + date.getDate()}</CardSubtitle>
        <img style={imgStyle} src={`http://openweathermap.org/img/w/${props.icon}.png`} alt={props.description}/>
        <CardText>{Math.round(props.temperature) + '\xB0C'}</CardText>
        <CardText>{props.description.charAt(0).toUpperCase() + props.description.slice(1)}</CardText>
      </Card></b>
    </div>
    )
}
export default WeatherCard;