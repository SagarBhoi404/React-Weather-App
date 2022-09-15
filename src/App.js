import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('dondaicha');

  useEffect(() => {
    const fetchData = async () => {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=88335c7e163105f3f31290fc699c1f02`;
      const response = await fetch(api);
      const resJSon = await response.json();
      if (resJSon.cod != 404) { 
        setCity(Array(resJSon.main, ...resJSon.weather)) 
      } else 
      { setCity(null) }
    }
    fetchData();
  }, [search])

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="box">
        <input type="text" placeholder='Search city' value={search} onChange={(e) => {
          setSearch(e.target.value);
        }} />

        {!city ? <p>No Data Found</p> :
          <div className="info">
            <h1 style={{textTransform: 'capitalize' ,marginBottom:'10px'}}><i className="fa-solid fa-street-view"></i> {search}</h1>
            <p>{city[1].main}</p>
            <h2><span style={{ fontStyle: 'italic' }}>{city[0].temp}</span> °Cel</h2>
            <p>Min : {city[0].temp_min}°Cel | Max : {city[0].temp_max}°Cel</p>

          </div>
        }
      </div>
      <h5>Developed by Sagar Bhoi ❤️</h5>
    </div>
  );
}

export default App;
