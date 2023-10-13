import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import millify from "millify"
import {Col, Row, Typography, Radio } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import {fetchDetails} from '../../services/cryptoDetailsApi'
import {fetchHistory} from '../../services/cryptoHistory'
import Loader from "../Loader/Loader"
import LineChart from "../Loader/LineChart"
import './cryptodetails.css'

import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';



const {Title, Text} = Typography

const Cryptodetails = () => {

  const {coinId} = useParams()

  const [timePeriod , setTimePeriod] = useState('1y')
  const dispatch = useDispatch()
  const {data, loading, error} = useSelector((state)=>state.coinDetailsApi)
  const {data2, loading2, error2} = useSelector((state)=>state.coinHistoryApi)
  useEffect(()=>{
    dispatch(fetchHistory({coinId, timePeriod}))
    dispatch(fetchDetails(coinId))
  },[dispatch,timePeriod])
  
  const cryptoDetails = data?.data?.coin // Object Details
  const coinHistory = data2?.data?.history // Array of prices over time
  const coinChange = data2?.data?.change // Just a string (number) value


  if(loading2 || data2===undefined){
    return <Loader/>
  }

  
//-------------------------------------------------------------------------

  const volume = cryptoDetails?.["24hVolume"];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${volume && millify(volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined/> },
  ];

  const options = [
    {label: '3h',value: '3h',},{  label: '24h',  value: '24h',},{  label: '7d',  value: '7d',},{  label: '30d',  value: '30d',},{  label: '3m',  value: '3m',},{  label: '1y',  value: '1y',},{  label: '3y',  value: '3y',},{  label: '5y',  value: '5y',},
  ];


  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
//-------------------------------------------------------------------------
  return (
    <>
      <div className="cryptodetails-container">
        <div className="coin-heading-container">
          <span className="coin-name" style={{color:`${cryptoDetails?.color}`, textShadow: '2px 2px 2px var(--bg-grey)'}}>
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price 
          </span>
        </div>
        

        {/* Image and other Details */}
        <img src={cryptoDetails?.iconUrl} alt="icon" style={{width : '10rem'}}/>
        <h2 level={2} style={{color: "var(--green)", textShadow: '2px 2px 2px var(--bg-grey)'}}>Current Price : $ {millify(cryptoDetails?.price)}</h2>

        {/* This is a Radio component for Time period */}
        <Radio.Group options={options} onChange={({target : {value}})=>setTimePeriod(value)} value={timePeriod}  optionType="button"/>
        
        <LineChart coinHistory={coinHistory} coinColor={cryptoDetails?.color} timePeriod={timePeriod}/>

        {/* Stats Container------------------------------------------------- */}
        <div className="stats">
        <div className="stats-container">
          <div className="coin-value-statistics">
              <div >{cryptoDetails?.name} Statistics</div>
          </div>
          {stats.map(({icon, title, value})=>{
            return <>
            <hr />
            <div className="coin-stats">
                <span>{icon}. {title} </span><span className="value-numeric">{value}</span>
            </div>
            </>
          })}
          <hr />
        </div>
          {/* Other Generic Stats ----------------------------------------------------- */}
        <div className="stats-container">
          <div className="coin-value-statistics">
            Other Stats 
          </div>
          {genericStats.map(({ icon, title, value }) => {
            return <>
            <hr />
              <div className="coin-stats">
                  <span>{icon}. {title} </span><span className="value-numeric">{value}</span>
              </div>
            </>
          })}
          <hr />

        </div>
        </div>
        

          {/* These Are the links for more Information------------------------------------------- */}
        <div className="coin-desc-link">
        <div className="coin-links">
          <h2 className="coin-details-heading">Know More About {cryptoDetails?.name}</h2>
          <ul style={{listStyle : "none"}}>
          {cryptoDetails?.links?.map((link) => {
          return <>
          <div className="coin-link" key={link.name}>
              <h3>{link.type}</h3>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </div>
            <hr />
          </>
          })}
          </ul>
        </div>
      </div>
      </div>
    </>
  )
}
export default Cryptodetails