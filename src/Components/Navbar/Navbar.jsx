import './navbar.css'
import { Menu, Typography, Avatar} from 'antd'
import icon from'../../images/Crypto 3.png'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'



const Navbar = () => {
  return (
    <div className='nav-container'>

      <div className='logo-container'>
        <Avatar src={icon} size={108} style={{background: "white"}}/>
          <Typography.Title level={2}>
            <Link to='/' style={{color: "white"}}>
              CYBER A$$ETS
            </Link>
          </Typography.Title>
      </div>

      {/* <div className='input-container'>
        <Input.Search
          placeholder="Search Keyword"
          allowClear
          enterButton="Search"
          size='middle'
        />
      </div> */}

      <div className="menu-container">
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchange">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
      </div>


    </div>
  )
}
export default Navbar