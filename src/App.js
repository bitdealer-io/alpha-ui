import React, { Component } from 'react';
import Map from './Map';
import SearchBox from './SearchBox';
import './App.css';

class App extends Component {

  initialLocation = [44.69, 10.63]
  initialValue    = `Reggio nell'Emilia, RE, Emilia-Romagna, Italy`
  state = {
    currentLocation: this.initialLocation,
    markers: [],
    searchValue: this.initialValue,
    searchSuggestions: [],
    isLoading: true
  }

  smartSuggest = (text) =>
    fetch(`https://nominatim.openstreetmap.org/search/${text}?format=json&limit=3`)
      .then(response => response.json())
      .then(searchSuggestions => this.setState({ searchSuggestions }))

  fetchSellOrders = (latitude, longitude) => 
    fetch(`https://bitdealer-server.herokuapp.com/order/sell?location={"lat":${latitude},"lon":${longitude}}`)
      .then(response => response.json())
      .then(markers => this.setState({ markers, isLoading: false }))
      .catch(console.error)

  componentDidMount() {
    const [latitude, longitude] = this.state.currentLocation;
    this.fetchSellOrders(latitude, longitude);
  }

  render() {
    const { isLoading, markers, currentLocation, searchValue, searchSuggestions } = this.state;

    if (isLoading)
      return <div className="box">Loading...</div>;

    return (
      <div className="container">
        <h1 className="title">BITDEALER.IO</h1>
        <SearchBox 
          suggestions={searchSuggestions}
          selectedValue={searchValue}
          selectedLocation={currentLocation}
          onSelect={(location, selected) => {
            const [latitude, longitude] = location;
            this.fetchSellOrders(latitude, longitude);
            this.setState({ 
              searchSuggestions: [], 
              searchValue: selected,
              currentLocation: location,
            })
          }}
          onTextChange={e => this.smartSuggest(e.target.value)} 
        />
        <Map 
          initialPosition={currentLocation}
          markers={markers}
        /> 
      </div>
    );
  }
}

export default App;
