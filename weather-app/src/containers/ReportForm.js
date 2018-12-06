import React from "react"
// import the LocationSearchInput
import LocationSearchInput from './LocationSearchInput'

class ReportForm extends React.Component {
  // Set up a state to help pass data back to the parent App component
  constructor(){
    super()
    this.state = {
      cityLoc: '',
      countryLoc: ''
    }
  }

  // Get the info from the LocationSearchInput component and save
  // it to state here in ReportForm.
  setFormLocation = (googleLocation) => {
    let parsedLoc = googleLocation.split(', ')
    this.setState({
      cityLoc: parsedLoc[0],
      countryLoc: parsedLoc[parsedLoc.length - 1]
    })
  }

  // Process the form submission with the info that was just
  // saved to ReportForm.state
  createReportLocation = () => {
    const inputLocation = {
      cityLoc: this.state.cityLoc,
      countryLoc: this.state.countryLoc
    }
    // Call the parent App component's setReportLocation function, which
    // sets App.state. so that all other components will have access to it.
    this.props.setReportLocation(inputLocation)
  }

  render(){
    return (
      <LocationSearchInput createReportLocation={this.createReportLocation} setFormLocation={this.setFormLocation}/> 
    )
  }
}

export default ReportForm