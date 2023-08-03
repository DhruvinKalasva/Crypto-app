import React from 'react'
import "./CoinChart.css"
// import Chart from "react-google-charts";
import {Line} from "react-chartjs-2";
import {Chart,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js"

Chart.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const CoinChart = ({arr=[] , currencySymbol, days}) => {

    const prices = []
    const date = []

    for (let i = 0; i < arr.length; i++) {
      if(days==="24h"){
        date.push(new Date(arr[i][0]).toLocaleTimeString()); 
      }else{
      date.push(new Date(arr[i][0]).toLocaleDateString()); }
      prices.push(arr[i][1]);
    }



  return (
    <div className='chart'>
        <Line 
        options={{responsive:true}} 
        data={{labels:date,datasets:[{
            label:`Price in ${currencySymbol}`,
            data:prices,
            borderColor: "#00FF57",
            backgroundColor: "rgba(0, 255, 87,0.5)",
        }]}}
        />

          {/* <Chart
                width={'100%'}
                height={450}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={prices}
                options={date}
                rootProps={{ 'data-testid': '1' }}
              />  */}
    </div>
  )
}

export default CoinChart