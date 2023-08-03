import React from 'react'
import "./CoinCard.css"
import { Link } from 'react-router-dom'

const CoinCard = ({id,name,img,symbol,currentPrice,currencySymbol="₹"}) => {
    return (
      <div className='coin-card-container'>
  
        <Link to={`/coin/${id}`} >

          <div className='coin-card'>
              <img src={img} alt=''/>
              <h3>{symbol}</h3>
              <h4>{name}</h4>
              <h4>{currentPrice ? `${currencySymbol}${currentPrice}`:``}</h4>
          </div>
        </Link>
  
      </div>
    )
  }

export default CoinCard