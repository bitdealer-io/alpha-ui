import React from 'react';

const SearchBox = ({ onTextChange, onSelect, selectedValue, selectedLocation, suggestions }) => {
  const [lat, lon] = selectedLocation;
  return (
    <div className="card">
      <header className="card-header"><p className="card-header-title">Search</p></header>
      <div className="card-content">
        <form className="control has-icons-left has-icons-right">
          <input
            className="input is-large"
            placeholder="Enter a city or GPS location (comma separated)"
            type="text"
            onChange={onTextChange}
          />
          <span className="icon is-medium is-left">
            <i className="fa fa-search" />
          </span>
          <span className="icon is-medium is-right">
            <i className="fa fa-arrow-right" />
          </span>
        </form>
        <div className="buttons">
          {
            suggestions.map((s, i) => {
              const { lat, lon, display_name } = s;
              return (
                <span
                  key={i}
                  onClick={() => onSelect([lat, lon], display_name)}
                  className="button is-link"
                >
                  {display_name}
                </span>
              );
            })
          }
        </div>
      </div>
      <footer className="card-footer">
        <span className="card-footer-item">
          <p className="title is-6">{selectedValue}</p>
        </span>
        <span className="card-footer-item">
          <p className="subtitle is-6">{lat},{lon}</p>
        </span>
      </footer>
    </div>
  )
}

export default SearchBox;



