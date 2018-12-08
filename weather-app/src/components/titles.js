import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../App.css';

const Titles = () =>{
  const jumbotronStyle = {
    background: 'linear-gradient(rgba(0, 0, 250, 0.35), rgba(125, 250, 250, 0)'
  }
  return (
    <div>
      <Jumbotron style={jumbotronStyle}>
        <font color='white'>
          <h1 className="display-1">Weather App</h1>
          <p className="lead"style={{paddingLeft: "15px"}}>Find the 5 day weather forecast for different cities </p>
        </font>
      </Jumbotron>
    </div>
  )
}
export default Titles;