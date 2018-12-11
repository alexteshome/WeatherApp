import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../App.css';
import ReportForm from '../containers/ReportForm';

const Titles = (props) =>{
  return (
    <div>
      <Jumbotron className='jumbotron text-center'>
        <font color='white'>
          <h1 className="display-1">City Forecast</h1>
          <p className="lead">Find the 5 day weather forecast for different cities </p>
        </font>
        <ReportForm classname="search-bar" setReportLocation={props.setReportLocation}/>
        <br/>
      </Jumbotron>
    </div>
  )
}
export default Titles;