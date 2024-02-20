import React, { useState, useMemo, useEffect } from 'react'
import Select from "react-select";

const CountrySelect = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);

    return (
        <Select
            className='text-black'  
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption: any) => setSelectedCountry(selectedOption)}
        />
    );
  };

export default CountrySelect;
