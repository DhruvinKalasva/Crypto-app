import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../index"
import ExchangeCard from '../components/ExchangeCard/ExchangeCard'
import ErrorComponent from '../components/ErrorComponent/ErrorComponent'
import Loader from '../components/Loader/Loader'

const Exchanges = () => {

const [exchanges,setExchanges] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);


  useEffect(() =>{
    const fetchExcahnges = async() =>{

      try{

        const {data} = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
      }

    };
    fetchExcahnges();
    
  },[]);

  if(error){
    return <ErrorComponent message={"Error while fetching exchanges"} />
  }

  return (
    <div className='main-exchange-container'>
      {loading ? <Loader /> : 
        <div className='exchange-card-container'>
        
        {exchanges.map((item) =>(
            <ExchangeCard 
            key={item.id} 
            name={item.name} 
            img={item.image} 
            url={item.url}
            rank={item.trust_score_rank}  
            />

        ))}
        
        </div>
      }
      
    </div>
  )
}

export default Exchanges