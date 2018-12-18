import React from 'react';
import LocationSearchInput from '../containers/LocationSearchInput';
import { Jumbotron } from 'reactstrap';
import '../App.css';

const Titles = () =>{
    return (
        <div>
        <Jumbotron className='jumbotron text-center'>
            <font color='white'>
            <h1 className="display-1">City Forecast</h1>
            <p className="lead">Find the 5 day weather forecast for different cities </p>
            </font>
            <LocationSearchInput classname="search-bar"/>
            <br/>
        </Jumbotron>
        </div>
    )
}
export default Titles;