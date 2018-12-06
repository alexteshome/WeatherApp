import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        address: '', 
        isGeocoding: false, 
        error: '' 
    }
    }
  
    handleChange = (address) => {
      this.setState({ address })
    }
  
    handleSelect = (address) => {
      this.setState({address, isGeocoding: true});
      const setFormLocation = this.props.setFormLocation
      geocodeByAddress(address)
        .then(res => setFormLocation(res[0].formatted_address))
        .then(() => this.setState({isGeocoding: false}))
        .catch(error => console.error('Error', error))
    }
    handleError = (status, clearSuggestions) => {
      console.log('Error from Google Maps API: ', status); 
      this.setState({ error: status }, () => {
        clearSuggestions();
      });
    };
  
    render() {
      const suggestionStyle = {
        backgroundColor: '#f1f1f1',
        color: 'gray',
        fontSize: '90%',
        padding: '0.25em 0.7em'
      }
      const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
        <div className="autocomplete-root">
          <input className="form-control" {...getInputProps({placeholder: 'Search a city...'})} style={{ background: 'transparent', borderColor: 'white'}}/>
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => (
              <div {...getSuggestionItemProps(suggestion)} className="suggestion" style={suggestionStyle}>
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      );
  
      const searchOptions = {
        types: ['(cities)'],
       }
  
      return (
        <div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            onError={this.handleError}
            searchOptions={searchOptions}
            shouldFetchSuggestions={this.state.address.length > 2}
            >
            {renderInput}
            
          </PlacesAutocomplete>
          {this.state.error.length > 0 && (
            <div>{this.state.error}</div>
          )}
          {this.state.address && this.state.isGeocoding && this.props.createReportLocation()}
        </div>
      );
    }
  }
  
  export default LocationSearchInput