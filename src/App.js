
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  <SpeedInsights />
  const [rivers,setRivers] =useState([])
  const [search,setSearch] = useState('')
  const URL = "https://api.water.noaa.gov/nwps/v1/gauges"

  useEffect(() => {
    fetchRiverData()
  },[])

  const fetchRiverData = async () => {
    try {
      const response = await axios.get(URL); 
      if (response.data?.gauges) {
        const massRivers = response.data.gauges.filter(
          gauge => gauge.state?.abbreviation === 'MA'
        );
        setRivers(massRivers);
      }
    } catch (error) {
      console.error("Error fetching river data:", error);
    }
  };

  const filteredRivers = rivers.filter(river => 
    river.name.toLowerCase().includes(search.toLowerCase())
  );



  
  const listRivers = (
    <div className="river-container">
      {filteredRivers.map(river => (
        <div key={river.lid} className="river-card">
          <h3>{river.name}</h3>
          <h4>Current Flow: {river.status?.observed?.primary || 'N/A'} Cfps</h4>
          <h4>Flooded? {river.status.observed.floodCategory}</h4>
        </div>
      ))}
    </div>
  );

  

  
  return (
    <div className="App">
      <header className="App-header">
  
        <input
          type='text'
          placeholder='Search for a river'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='search-input'
        >
        </input>
        <h3>
          {listRivers} 
        </h3>
      </header>
    </div>
  );
}

export default App;
