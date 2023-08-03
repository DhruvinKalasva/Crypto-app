import React from 'react'
import { Link } from 'react-router-dom'
import "./TrendCoins.css"

const TrendCoins = ({id,name,img,rank}) => {
  return (
    <div>
        
        <Link to={`/coin/${id}`} >

          <div className='trend-card'>
              <div className='trend-inner'>
              <img className='trend-img' src={img} alt=''/>
              <h5>#{rank}</h5>
              <h5>{name}</h5>
              </div>
              {/* <h4>{currentPrice ? `${currencySymbol}${currentPrice}`:`NA`}</h4> */}
          </div>
        </Link>
    </div>
  )
}

export default TrendCoins