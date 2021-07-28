import { useState } from 'react';
import ws from "./Weather.module.css";
import axios from 'axios';

require('dotenv').config();

const Weather = (props) => {
    
    // console.log(process.env.REACT_APP_X);
    // console.log(process.env.REACT_APP_API_KEY);

    const API_KEY = process.env.REACT_APP_API_KEY;
    
    const [input, setInput] = useState("");
    
    // API RESPONSE DATA
    const [fDeg, setFdeg] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [coordLat, setCoordLat] = useState(null);
    const [coordLon, setCoordLon] = useState(null);
    const [icon, setIcon] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(input);
        getWeather(input);
    }

    const getWeather = (input) => {

        axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + API_KEY)
            .then(res => {
                console.log(res.data);
                const API_RES = res.data;
                // set temperature
                setFdeg(Math.round(API_RES.main.temp));
                // set name
                setName(API_RES.name);
                // set weather description
                setDesc(API_RES.weather[0].description);
                // set LAT
                setCoordLat(API_RES.coord.lat);
                // set LON
                setCoordLon(API_RES.coord.lon);
                // set icon
                setIcon(API_RES.weather[0].icon);

            })
            .catch(err => {
                console.log(err);
                setName("");
            })
    }

    return (
        <div>
            {/* input: {JSON.stringify(input)} <br />
            fDeg: {JSON.stringify(fDeg)} */}
            <div className={ws.wrapper}>
                <h1>OpenWeather API 🌤</h1>
                <hr />
                <div className={ws.formGroup}>
                    <form onSubmit={submitHandler}>
                        {/* <label htmlFor="cityName">City:</label> */}
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            type="text"
                            name="cityName"
                            id="cityId"
                            placeholder="city name"
                        />
                        <button type="submit">Submit</button>
                    </form>

                    {/* *********** DISPLAY CARD ********** */}
                    {
                        name ? (
                            <div className={ws.card}>
                            <h3>{name}</h3>
                            <h1>{fDeg}</h1>
                            <h4>{desc}</h4>
                            <img src={"http://openweathermap.org/img/wn/" + icon + "@4x.png"} alt="weather icon"/>
                            <p>Lat: {coordLat} <br/>Lon: {coordLon} </p>
                        </div>
                        ) :
                        <div className={ws.noCard}>Please enter a valid city</div>
                    }
                    {/* ******** NO CARD ************* */}

                    <p>
                        data by <a href="https://openweathermap.org/">OpenWeatherMap.org</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Weather;
