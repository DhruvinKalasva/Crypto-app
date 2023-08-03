import React from 'react'
import "./ExchangeCard.css"

const ExchangeCard = ({name,img,rank,url}) => {
  return (
    <div className='exchange-card-container'>

      <a href={url} target={"black"}>
        <div className='exchange-card'>
            <img src={img} alt=''/>
            <h3>{rank}</h3>
            <h4>{name}</h4>
        </div>
      </a>

    </div>
  )
}

export default ExchangeCard