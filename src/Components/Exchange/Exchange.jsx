import { useSelector, useDispatch } from "react-redux"
import { fetchExchanges } from "../../services/cryptoExchange"
import { useEffect } from "react"
import Loader from '../Loader/Loader'
import { Row, Col, Typography, Avatar } from "antd"
import millify from "millify"
import './exchanges.css'

const {Text, Title} = Typography


const Exchange = () => {

  const dispatch = useDispatch()

  const {data, loading, error} = useSelector((state)=>state.exchangeApi)
  useEffect(()=>{
    dispatch(fetchExchanges())
  },[dispatch])
  
  const exchanges = data?.data?.exchanges
  

  if(loading || exchanges===undefined) return <Loader/>
  

  return (
    <div className="exchanges" style={{padding: '1rem'}}>
      <Row className="header">
          <Col span={4}><strong  className="headerTitle">Rank</strong></Col>
          <Col span={5}><strong  className="headerTitle">Exchanges</strong></Col>
          <Col span={5}><strong  className="headerTitle">Icon</strong></Col>
          <Col span={5}><strong  className="headerTitle">24h Trade Volume</strong></Col>
          <Col span={5}><strong  className="headerTitle">Markets</strong></Col>
      </Row>
        {exchanges.map((exchange) => {
          return <Row className="content">
            <Col span={24}>
                  <Row key={exchange.uuid}>
                    <Col span={4} className="centerThis rank"><strong>{exchange.rank}</strong></Col>
                    <Col span={5} className="centerThis"><strong>{exchange.name}</strong></Col>
                    <Col span={5} className="centerThis"><Avatar src={exchange.iconUrl} className="roundAvatar"/></Col>
                    <Col span={5} className="centerThis">${millify(exchange?.["24hVolume"])}</Col>
                    <Col span={5} className="centerThis">{millify(exchange.numberOfMarkets)}</Col>
                  </Row>
          </Col>
      </Row>
        })}
    </div>
  )
}
export default Exchange