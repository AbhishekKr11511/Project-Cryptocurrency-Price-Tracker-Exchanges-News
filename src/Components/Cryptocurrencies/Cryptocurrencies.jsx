import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { Row, Col, Input,} from "antd"
import { fetchCoins } from "../../services/cryptoApi"
import { useSelector, useDispatch } from "react-redux"
import SingleCoin from './SingleCoin'

const dummyArray = [1,2,3,4,5,6,7,8,9,10]

const Cryptocurrencies = ({limit}) => {

  const dispatch = useDispatch()
  const {data, loading, error} = useSelector((state)=>state.coinsApi)
  const coins = data?.data?.coins
  const [coinsList, setCoinsList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(()=>{
    const filteredData = coins?.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setCoinsList(filteredData)
  },[coinsList,searchTerm])
  
  useEffect(()=>{
    dispatch(fetchCoins(limit))
  },[dispatch])

  
  if(loading){
    return (
      <>
        <Row gutter={[0,0] } >
          {dummyArray.map((item, index)=>{
          return <SingleCoin loading={true} key={index}/>
          })}
        </Row>
      </>
    )
  }

  return (
    <div  className="cryptocurrencies-container" style={{padding: '1rem'}}>

      {/* <Row className="search-crypto"  style={{marginBottom: 10 }}>
        <Input placeholder="Search Currency" onChange={(e)=>{
          setSearchTerm(e.target.value)
          }}
          style={{width : 500}}></Input>
      </Row> */}
      
      <Row gutter={[10,10]} >

        {coinsList?.map((item, index)=>{
        return <Col>
        <SingleCoin 
        uuid={item.uuid}
        iconUrl={item.iconUrl}
        name={item.name}
        rank={item.rank}
        loading={false} 
        key={index} 
        price={item.price} 
        coinrankingUrl={item.coinrankingUrl} 
        marketCap={item.marketCap} 
        change={item.change}/>
        </Col>
        
        

        })}
      </Row>
      
    </div>
  )
}
export default Cryptocurrencies