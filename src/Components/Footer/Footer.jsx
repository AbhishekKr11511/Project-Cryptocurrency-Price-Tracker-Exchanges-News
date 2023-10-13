import './footer.css'
import { Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <Typography.Title level={5} style={{
    color: "white",
    textAlign: "center",
    }}>
      CYBER ASSETS<br/>
      All Rights Reserved .
      <b>©</b>
    </Typography.Title>
    <Space>
      <Link to={'/'}>Home</Link>
      <Link to={'/exchange'}>Exchanges</Link>
      <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
      <Link to={'/news'}>News</Link>
      <Link to={'/privacy'}>Privacy Policy</Link>
    </Space>
  </>
  )
}
export default Footer