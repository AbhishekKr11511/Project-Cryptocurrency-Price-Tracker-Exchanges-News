import { useSelector, useDispatch } from "react-redux"
import { fetchNews } from "../../services/newsApi"
import { useEffect } from "react"
import SingleNews from './SingleNews'
import { Col, Row } from "antd"
import  asset1  from "../../Assets/asset_1.jpeg"
import  asset2  from "../../Assets/asset_2.jpeg"
import  asset3  from "../../Assets/asset_3.jpeg"
import  asset4  from "../../Assets/asset_4.jpeg"
import  asset5  from "../../Assets/asset_5.jpeg"
import  asset6  from "../../Assets/asset_6.jpeg"
import  asset7  from "../../Assets/asset_7.jpeg"

const dummyArray = [1,2,3,4,5,6,7,8,9,10]

const demoImage = () => {
  let random = Math.ceil(Math.random()*8)
  switch (random) {
    case 1:
      return asset1
    case 2:
      return asset2
    case 3:
      return asset3
    case 4:
      return asset4
    case 5:
      return asset5
    case 6:
      return asset6
    default:
      return asset7
  }
} 

const News = ({count}) => {

  const dispatch = useDispatch()
  const {data, loading , error } = useSelector((state)=>state.newsApi)
  const newsArticle = data?.value

  useEffect(()=>{
    dispatch(fetchNews(count))
  },[dispatch])


  if(loading || newsArticle===undefined){
    return (
      <>
        <Row gutter={[0,0] } >
          {dummyArray.map((item, index)=>{
          return <SingleNews loading={true} key={index}/>
          })}
        </Row>
      </>
    )
  }
  
  return (
    <>
      <Row gutter={[0,0]}>
        {newsArticle?.map((item, index)=>{
          return <Col span={6}>
              <SingleNews name={item.name} 
              date={item.datePublished}  
              link={item.url} 
              info={item.description} 
              source={item.provider[0].name} 
              imageUrl={item.image?.thumbnail.contentUrl || demoImage()} sourceImg={item.provider[0].image?.thumbnail.contentUrl} 
              loading={false}/>
          </Col>
          
          
        })}


      </Row>
    </>
  )
}
export default News