import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import { server } from '../index';
import axios from 'axios';
import "./CoinDetails.css";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri"
import CoinChart from '../components/CoinChart/CoinChart';



const CoinDetails = () => {

  const [coin,setCoin] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  const [days,setDays] = useState("24h");
  const [chartArray,setChartArray] = useState([]);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const chartTimeBtns = ["24h","7d","14d","30d","60d","200d","365d","max"];
    const switchChartstats = (val) =>{
      setDays(val);
      setLoading(true);
    }

  const params = useParams();


  useEffect(() =>{
    const fetchCoin = async() =>{

      try{

        const {data} = await axios.get(`${server}/coins/${params.id}`);

        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        // console.log(chartData)
        // console.log(data)
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
      }

    };

    fetchCoin();
    
  },[params.id, currency, days]);

  if(error){
    return <ErrorComponent message={"Error while fetching Coin Details"} />
  }

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <div>

        <div className='rad-container'>

        <div className='currency-radio-btn'>

        <input type='radio' value={"inr"} id='inr' className='currency-radio-input' name='currency' onChange={handleChange}/>
        <label htmlFor="inr" className='currency-radio-label'>₹</label>

        <input type='radio' value={"usd"} id='usd' className='currency-radio-input' name='currency' onChange={handleChange}/>
        <label htmlFor="usd" className='currency-radio-label'>$</label>

        <input type='radio' value={"eur"} id='eur' className='currency-radio-input' name='currency' onChange={handleChange}/>
        <label htmlFor="eur" className='currency-radio-label'>€</label>
        </div>
        </div>

          

      {loading ? <Loader /> : 
      <div className='coin-detail-container'>

        
        <div className='coin-detail-part-1'>
                <div>
                  <img src={coin.image.large} alt="" />
                  <h3 className='coin-rank'>#{coin.market_data.market_cap_rank}</h3>
                </div>
                <div className='coin-name-section'>
                    <h1 className='coin-name'>{coin.name}</h1>
                    <h3 className='coin-price'>{currencySymbol} {coin.market_data.current_price[currency]}</h3>
                    <small>{ coin.market_data.price_change_percentage_24h > 0 ? <RiArrowUpSFill /> : <RiArrowDownSFill />} {coin.market_data.price_change_percentage_24h} </small>
                </div>
        </div>

        <div className='coin-chart-part'>
            <small className='time-part'>Last updated on : {Date(coin.last_updated)}</small>

            <div><CoinChart arr={chartArray} currencySymbol={currencySymbol} days={days}/></div>

            <div className='chart-time-btns'>{
              chartTimeBtns.map((i) =>(
                <button key={i} onClick={()=>switchChartstats(i)}>{i}</button>
              ))
              }
            </div>
        </div>
        

        <div>
          <div className='time-range-bar'></div>
            <div className='bar-label'>
              <div className='label-red'>{currencySymbol} {coin.market_data.low_24h[currency]}</div>
              <div>24H Range</div>
              <div className='label-green'>{currencySymbol} {coin.market_data.high_24h[currency]}</div>
            </div>
        </div>

        <div className='coin-details-section'>
            <table>
              <tr>
                <td>
                Max Supply:
                </td>
                <td>
                {coin.market_data.max_supply ? coin.market_data.max_supply : "NULL"}
                </td>
              </tr>
              <tr>
                <td>
                Circulating Supply:
                </td>
                <td>
                {coin.market_data.circulating_supply}
                </td>
              </tr>
              <tr>
                <td>
                Market Cap:
                </td>
                <td>
                {currencySymbol} {coin.market_data.market_cap[currency]}
                </td>
              </tr>
              <tr>
                <td>
                All Time Low:
                </td>
                <td>
                {currencySymbol} {coin.market_data.atl[currency]}
                </td>
              </tr>
              <tr>
                <td>
                All Time High:
                </td>
                <td>
                {currencySymbol} {coin.market_data.ath[currency]}
                </td>
              </tr>
              
              </table>    


        </div>

        

        </div>
      }

    </div>
  )
}

export default CoinDetails


