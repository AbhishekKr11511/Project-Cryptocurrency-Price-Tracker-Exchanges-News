import millify from "millify"
import { Typography,Row, Col, Statistic } from "antd"
import { Link } from "react-router-dom"
import { Title } from "chart.js"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {fetchCoins} from '../../services/cryptoApi'
import Cryptocurrencies from "../Cryptocurrencies/Cryptocurrencies"
import News from '../News/News'
import ContentLoader from "../Loader/ContentLoader"
import Error500 from '../Loader/Error500'


const Home = () => {

  const dispatch = useDispatch()
  const {data, loading, error} = useSelector((state)=>state.coinsApi)

  useEffect(()=>{
    dispatch(fetchCoins());
  }, [dispatch])


  // This very important, as don't forget data?, which ensures that 
  // The fetching the api data will proceed even if initially data = null
  // Thus when the data fetching is complete, it can show the data
  const globalStats = data?.data?.stats

  if(loading || globalStats===undefined) return <ContentLoader/>
  if( error )return <Error500/>
  
    return (
      <div style={{padding: '1rem'}}>
        <div className="heading" style={{fontFamily: 'var(--font-comfort)', fontSize:'2rem', padding: '1rem 0'}}>
          Global Crypto Stats
        </div>
  
        <Row>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins}/></Col>
          <Col span={12}><Statistic title="Total Exchange" value={millify(globalStats.totalExchanges)}/></Col>
          <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
          <Col span={12}><Statistic title="Total 24hr Volume" value={millify(globalStats.total24hVolume)}/></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
        </Row>

        <div className="home-heading-container" style={{fontSize: '1.5rem', textAlign: 'center'}}>
          <a href="/cryptocurrencies">Top 100 Most Popular Crypto Currencies Today !!</a>
        </div>
        
        <div className="home-heading-container">
        <div className="home-title" style={{fontSize: '1.5rem'}}>Latest Crypto News</div>
          <div className="show-more" style={{fontSize : '1rem'}}><Link to='/news'>Show More</Link></div>
        </div>
        <News count={6}/>
      </div>
    )
}
export default Home