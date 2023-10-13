import { Card, Avatar, Input } from "antd"
import './singleCoin.css'
import { Link } from "react-router-dom"
import millify from "millify"
const {Meta} = Card

const SingleCoin = (props) => {

    const {iconUrl, name, rank, loading, price, coinrankingUrl, marketCap, change, uuid} = props
    
    return (
        <>
            <Link key={uuid} to={`/crypto/${uuid}`}>
                <Card
                hoverable
                style={{
                    width: 350,
                }}
                loading={loading}
                >
                    {/* <Meta
                    title={`.${rank}  ${name} `}
                    avatar={<Avatar src={iconUrl}/>}
                    /> */}
                    <div className="box">
                        <div className="crypto-header">
                            <h3>{rank}. {name}</h3>
                            <img src={iconUrl} alt="icon" style={{width: 40, height: 40}} />
                        </div>
                        <hr />
                        <h4 className="details">Price : $ {millify(price)}</h4>
                        <h4 className="details" >24hr Change : <span style={{
                            color : change<0? "red": "green"
                        }}>${millify(change)}</span></h4>
                        <h4 className="details">Market Cap : ${millify(marketCap)}</h4>
                        <p className="detail"><a href={coinrankingUrl} target="_new">Show Details</a></p>
                    </div>
                </Card>
            </Link>
        </>
    )
    }
export default SingleCoin