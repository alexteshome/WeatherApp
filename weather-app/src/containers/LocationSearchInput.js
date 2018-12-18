import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { getDayForecast, getWeekForecast } from '../actions/getForecast';
import { connect } from 'react-redux';
import '../App.css';

class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        address: '', 
        error: '' 
    }
    }
    // Have to state every time something is typed in input/search bar
    handleChange = (address) => {
      this.setState({ address, error: '' })
    }
    
    /*  
        Handles the event of clicking a suggestion for autocomplete. 
        Uses the action creator to call the api using redux-thunk's asynchronous calls and saves
        the details of both today's and five day weather forecasts in the store. 

    */
    handleSelect = (address) => {
        geocodeByAddress(address)
            .then(res => {
                const parsedLoc = res[0].formatted_address.split(', ')
                const cityCountryLoc = {
                    cityLoc: parsedLoc[0],
                    countryLoc: parsedLoc[parsedLoc.length - 1]
                }
                this.props.getDayForecast(cityCountryLoc);
                this.props.getWeekForecast(cityCountryLoc);
            })
            .then(() => this.setState({address: ''}))
            .catch(error => console.error('Error', error))        
    }
        
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API: ', status); 
        this.setState({ error: status }, () => {
            clearSuggestions();
        });
    };
    
    componentWillReceiveProps(nextProps) { 
        if(nextProps.errors) {
            this.setState({
                error: nextProps.error
            });
        }
    }
    render() {
        const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
            <div className="autocomplete-root">
            <input className="form-control" {...getInputProps({placeholder: 'Search a city...'})}/>
            <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => (
                <div {...getSuggestionItemProps(suggestion)} className="suggestion">
                    <span>{suggestion.description}</span>
                </div>
                ))}
            </div>
            </div>
        );
        //Only receive cities as input and suggest accordingly
        const searchOptions = {
            types: ['(cities)'],
        }
    
        return (
            <div className="search-bar">
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                onError={this.handleError}
                searchOptions={searchOptions}
                //Only start suggesting after more than 2 characters have been typed
                shouldFetchSuggestions={this.state.address.length > 2}
                >
                {renderInput}
                
            </PlacesAutocomplete>
            {this.state.error.length > 0 && (
                <div>{this.state.error}</div>
            )}
            </div>
        );
        }
}
  
const mapStateToProps = (state) => ({
    error: state.error
})
// Pass in action creators as props
const mapDispatchToProps = {
    getDayForecast,
    getWeekForecast
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchInput);