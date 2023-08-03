import React, { useEffect, useState } from 'react';
import "./Home.css"
import heroimg from "../images/homepage4.jpg"
import exchangesimg from "../images/exchangesimg.jpg"
import coinsimg from "../images/coinsimg.jpg"
import { server } from '..';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import axios from 'axios';
import TrendCoins from '../components/TrendCoins/TrendCoins';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';


const Home = () => {

  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [trendingCoins,setTrendingCoins] = useState([]);
  
  // const [currency,setCurrency] = useState("inr");
  // const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

 

  const fetchCoins = async() =>{
    try{
      const {data:trend} = await axios.get(`${server}/search/trending`);
      console.log(trend.coins);
      setTrendingCoins(trend);
      setLoading(false);
    }catch(error){
      setError(true);
      setLoading(false);
    }

  };
  
  useEffect(() =>{
  fetchCoins();
},[]);


if(error){
  return <ErrorComponent message={"Error while fetching Coins"} />
}

  return (
    <div className="hero">
        <div className="mask">
            <img className="heroimg" src={heroimg} alt="theheroimg"/>
        </div>
            <div className="content">
                <h1>Find your Coins here.</h1>
                <h2>Check out the Trending Coins..</h2>
            </div>

            <div className='home-trend'>
              {loading ? <Loader /> : 
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
            }
            </div>

            <div className='home-container'>
              <h1>Features of KryptoN</h1>

              <div className='coin-feature'>
              <img  src={coinsimg} alt="theheroimg"/>
                <h2>You can find your your coins in coins section <br /><br /> <Link to="/coins">Coins</Link></h2>
              </div>
              <div className='exchange-feature'>
                <h2>You can search your exchanges here <br /><br /> <Link  to="/exchanges">Exchanges</Link></h2>
              <img  src={exchangesimg} alt="theheroimg"/>
            
              </div>
            </div>


    </div>
  )
}

export default Home