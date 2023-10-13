import { Avatar, Card } from "antd"
import './singlenews.css'
import {format} from 'date-fns'
import { useState } from "react"
import asset8 from '../../Assets/asset_8.png'
const {Meta} = Card


const SingleNews = (props) => {

  const {name, date, link, imageUrl, info, source, sourceImg, loading} = props

  const [hoverContainer, setHoverContainer] = useState(false);

  const handleMouseEnter = () => {
    setHoverContainer(true);
  };

  const handleMouseLeave = () => {
    setHoverContainer(false);
  };

  function limitTextTo25Words(text) {
    const words = text.split(' ');
  
    if (words.length <= 25) {
      return text;
    }
  
    return words.slice(0, 25).join(' ') + '...';
  }
  function limitTextTo10Words(text) {
    const words = text.split(' ');
  
    if (words.length <= 15) {
      return text;
    }
  
    return words.slice(0, 15).join(' ') + '...';
  }

  function dateFormator(date){
    const rawDate = new Date(date)
    const formattedDate = format(rawDate, 'd/ MM/ yy')
    return formattedDate
  }
  if(loading){
    return (
      <Card 
      style={{
          width: 350,
        }}
      loading={true}>
        <Meta
          avatar = {<Avatar src=''/>}
          title = ''
          description = ''
        />
      </Card>
    )
  }

  return (
    <>
        <Card
        hoverable
        style={{
            width: 300,
            margin: 10,
            height: 560
        }}
        cover={<img src={imageUrl} alt="example" />}
        >
          <div className="container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`${hoverContainer ? 'hidden' : ''}`}>
              <div className="source">
                <img src={sourceImg || asset8} alt="source" style={{width : 35, borderRadius: '50%'}}/>
                <h4 className="source">{source} | {dateFormator(date)}</h4>
                {/* <h5 className="date"></h5> */}
              </div>
              <h3 className="title">{limitTextTo10Words(name)}</h3>
          </div>
          <div className={`${hoverContainer ? '' : 'hidden'} info`}>
            <p>{limitTextTo25Words(info)}</p>
            <span className="readMore"><a href={link}>Read More...</a></span>
          </div>
          </div>
        </Card>
    </>
  )
}
export default SingleNews