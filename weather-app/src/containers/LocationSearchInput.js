import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import '../App.css';

class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        address: '', 
        isGeocoding: false, 
        error: '' 
    }
    }
    // Have to state every time something is typed in input/search bar
    handleChange = (address) => {
      this.setState({ address, error: '' })
    }
    
    /*  
        Handles the event of clicking a suggestion for autocomplete. 
        Sends location information back up to ReportForm container, then eventually App.js to call
        the openweathermap API. Also sets state isGeocoding to true, which indicates it has been selected.

    */
    handleSelect = (address) => {
      this.setState({address, isGeocoding: true});
      const setFormLocation = this.props.setFormLocation
      geocodeByAddress(address)
        .then(res => setFormLocation(res[0].formatted_address))
        .then(() => this.setState({address: '', isGeocoding: false}))
        .catch(error => console.error('Error', error))
    }
    handleError = (status, clearSuggestions) => {
      console.log('Error from Google Maps API: ', status); 
      this.setState({ error: status }, () => {
        clearSuggestions();
      });
    };
  
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
          {/* If there is an address and suggestion is clicked, show the weather information (call API and display) */}
          {this.state.address && this.state.isGeocoding && this.props.createReportLocation()}
        </div>
      );
    }
  }
  
  export default LocationSearchInput