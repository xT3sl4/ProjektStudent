import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function PriceChart({ productName }) {
  const API_BASE_URL = "http://127.0.0.1:8000/api";
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/price-history/${productName}/`)
      .then(response => response.json())
      .then(data => {
        setPriceData(data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching price data:", error));
  }, [productName]);

  if (loading) {
    return <p>Loading price history...</p>;
  }

  const groupedData = {};
  priceData.forEach(entry => {
    if (!groupedData[entry.source]) {
      groupedData[entry.source] = [];
    }
    groupedData[entry.source].push({
      timestamp: entry.timestamp,
      price: entry.price
    });
  });

  const chartData = {
    labels: priceData.map(entry => entry.timestamp), 
    datasets: Object.keys(groupedData).map(source => ({
      label: source, 
      data: groupedData[source].map(entry => entry.price),
      borderColor : { "X-Kom": "#0048a0", "MediaExpert": "#ffd500", "Morele": "#ff6c00" }[source],
      fill: false
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Price History for {productName}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;
