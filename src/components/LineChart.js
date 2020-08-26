import React from 'react';
import { Line } from 'react-chartjs-2'; 

function LineChart({ data, labels }) {
  const initData = {
    labels,
    datasets: data,
  };

  return <Line data={initData} />;
}

export default LineChart; 