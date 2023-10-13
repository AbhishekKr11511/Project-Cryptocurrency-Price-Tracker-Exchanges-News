import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Col, Row, Typography } from "antd";
const { Title } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

;

const LineChart = ({ coinHistory, coinColor, timePeriod }) => {
  const coinPrice = [];
  const coinTimeStamp = [];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }
  for (let i = 0; i < coinHistory?.length; i++) {
    coinPrice.push(coinHistory?.[i].price);
  }
  for (let i = 0; i < coinHistory?.length; i++) {
    let myDate = new Date(coinHistory?.[i].timestamp * 1000);
    let year = myDate.getFullYear();
    let month = String(myDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    let day = String(myDate.getDate()).padStart(2, "0");
    let hours = String(myDate.getHours()).padStart(2, "0");
    let minutes = String(myDate.getMinutes()).padStart(2, "0");
    let readableTime = `${day}/${month}/${year} | ${hours}:${minutes}`;
    coinTimeStamp.push(readableTime);
  }

  coinTimeStamp.reverse()

  const data = {
    labels:   coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: coinColor,
        borderColor: "white",
        
      },
    ],
  };

  return (
    <div className="crypto-chart" style={{width: '70vw' , background : 'var(--bg-grey)', padding: '1rem', borderRadius: '2rem'}}>
        <h2 style={{textAlign: 'center'}}>Price Change over {timePeriod}</h2>
      <Line data={data} options={options} color='black'/>
    </div>
  );
};
export default LineChart;
