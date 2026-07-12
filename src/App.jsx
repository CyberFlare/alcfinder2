import { useState, useEffect } from 'react'
import './App.css'
import Header from './component/Header'
import SummaryCard from './component/SummaryCard'
import Table from './component/table'
import BarGraph from './component/BarGraph'
import PieChart from './component/PieChart'

const url = 'https://api.openbrewerydb.org/v1/breweries?by_country=united_states&per_page=200'

function App() {

    const [allBreweries, setAllBreweries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const [totalBreweries, setTotalBreweries] = useState(0)
    const [mostCommonType, setMostCommonType] = useState('')
    const [breweriesWithWebsites, setBreweriesWithWebsites] = useState(0)

    const callAPI = async (url) => {
      const response = await fetch(url);
      const json = await response.json();
      if (!Array.isArray(json)) {
        alert("Oops! Something went wrong with that query, let's try again!")
      }
      else {
          fetchBreweries(json)
      }
    }

    const fetchBreweries = (data) => {
      setAllBreweries(data);
      countTotalBreweries(data);
      findMostCommonType(data);
      countBreweriesWithWebsites(data);
  };

  const countTotalBreweries = (data) => {
    setTotalBreweries(data.length);
  };

  const findMostCommonType = (data) => {
    const frequency = {};
    data.forEach(({ brewery_type }) => {
      frequency[brewery_type] = (frequency[brewery_type] || 0) + 1;
    });

    let mostCommon = '';
    let highest = 0;
    for (const type in frequency) {
      if (frequency[type] > highest) {
        highest = frequency[type];
        mostCommon = type;
      }
    }

    setMostCommonType(mostCommon);
  };

  const countBreweriesWithWebsites = (data) => {
    let count = 0;
    for (const brewery of data) {
      if (brewery.website_url) {
        count++;
      }
    }
    setBreweriesWithWebsites(count);
  };

  const state = searchTerm.trim().toLowerCase();
  
  const filteredBreweries = allBreweries.filter((brewery) => {
    const matchesState =
      state === '' || (brewery.state || '').toLowerCase().includes(state);
    const matchesType =
      selectedType === '' || brewery.brewery_type === selectedType;
    return matchesState && matchesType;
  });

  useEffect(() => {
    callAPI(url);
  }, []);


  return (
    <>
      <Header />
      <div className="summary-cards">
        <SummaryCard
          data={totalBreweries}
          title="Breweries Found"
          mode="light"
        />
        <SummaryCard
          data={mostCommonType}
          title="Most Common Type"
          mode="dark"
        />
        <SummaryCard
          data={breweriesWithWebsites}
          title="With Websites"
          mode="light"
        />
      </div>
      <div className="search-bar">
        <h1>Breweries</h1>
        <input
          type="text"
          placeholder="Search by state"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <label htmlFor="type">Filter by Type:</label>
        <select
          name="type"
          id="type"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="">All</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="brewpub">Brewpub</option>
          <option value="regional">Regional</option>
          <option value="large">Large</option>
          <option value="taproom">Taproom</option>
          <option value="bar">Bar</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="planning">Planning</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="data">
        <Table breweries={filteredBreweries} />
        <div className="chart-container">
          <BarGraph data={filteredBreweries} />
          <PieChart data={filteredBreweries}/>
        </div>
      </div>
    </>
  )
}

export default App
