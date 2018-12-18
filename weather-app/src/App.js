import React from 'react';
import Titles from './components/Titles';
import FiveDayForecast from './containers/FiveDayForecast';
import DayForecast from './components/DayForecast';
import { Provider } from 'react-redux';
import store from './store';
import './App.css'
import { Container } from 'reactstrap';

const App = () => {

    return(
        <Provider store = { store }>
            <div className="font-wrapper">
            <Titles/>
            <Container fluid>
                {/* 24 hour forecast information, passed to Weather and Graphing components after this container */}
                <DayForecast />
                <br/>
                {/* 5 day forecast list passed to container */}
                <FiveDayForecast/>
            </Container>
            <br/>
            </div>
        </Provider>
    )
}
export default App;