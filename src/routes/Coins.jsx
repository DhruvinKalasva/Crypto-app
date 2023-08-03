import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../index"
import CoinCard from '../components/CoinCard/CoinCard'
import ErrorComponent from '../components/ErrorComponent/ErrorComponent'
import Loader from '../components/Loader/Loader'
import TrendCoins from '../components/TrendCoins/TrendCoins'

const Coins = () => {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");
    const [trendingCoins,setTrendingCoins] = useState([]);
    
    const [search,setSearch] = useState([]);
    const [searchValue,setSearchValuse] = useState([]);

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page) => {
      setPage(page);
      setLoading(true);
    }

    const pageBtns = new Array(101).fill(1);

  useEffect(() =>{
    const fetchCoins = async() =>{

      try{

        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        const {data:trend} = await axios.get(`${server}/search/trending`);
        console.log(trend.coins);
        setTrendingCoins(trend);
        setCoins(data);
        setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
      }

    };

    fetchCoins();
    
  },[currency,page]);


  if(error){
    return <ErrorComponent message={"Error while fetching Coins"} />
  }

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  const handleSearch = async() =>{
    if(search.length !== 0){
      const {data:coinsearch} = await axios.get(`${server}/search?query=${search}`);
      console.log(coinsearch.coins);
      setSearchValuse(coinsearch.coins);
      setLoading(false);
    } else {
      alert("please Enter the name");
    }

  }

  return (
    <div className='main-coin-container'>
      {/* <h5 className='pg-num-top'>page : {page}</h5> */}

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
            
          {/* <select  name='currency' id="cars" onChange={handleChange}>
            <option className='currency-radio-btn' value={"inr"} id='inr'  >INR ₹</option>
            <option className='currency-radio-btn' value={"usd"} id='usd' >USD $</option>
            <option className='currency-radio-btn' value={"eur"} id='eur' >EUR €</option>
          </select> */}





      {loading ? <Loader /> : 
        <div >
              <div className='searchbar'>
                <input type="text" onChange={(e) => setSearch(e.target.value)} required/>
                <button onClick={handleSearch}>Search</button>
              </div>
              <div className='coin-card-container'>
                    {searchValue.map((item) =>(
                      <CoinCard 
                      id={item.id}
                      key={item.id} 
                      name={item.name} 
                      img={item.large} 
                      symbol={item.symbol}  
                      />
                    ))}
              </div>

                <h1 className='coin-heading'>Trending Coins</h1>
          <div className='trend-container'>
                {trendingCoins.coins.map((i) =>(

                    <TrendCoins 
                    id={i.item.id}
                    key={i.item.id} 
                    name={i.item.name} 
                    img={i.item.small}
                    rank={i.item.market_cap_rank}
                    />

                ))
                }
          </div>

            <h1 className='coin-heading'>Coins</h1>
          <div className='coin-card-container'>
        {coins.map((item) =>(
            <CoinCard 
            id={item.id}
            key={item.id} 
            name={item.name} 
            img={item.image} 
            currentPrice={item.current_price}
            symbol={item.symbol}  
            currencySymbol={currencySymbol}
            />

        ))}
        </div>
        </div>

        
      }

      <div className='page-btns'>
        {
          pageBtns.map((item,index)=>(
            <button onClick={() => changePage(index+1)}> {index+1} </button>
          ))
        }
      </div>
      <h5 className='pg-num-down'>page : {page}</h5>
      
    </div>
  )
}


export default Coins