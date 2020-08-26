import React from 'react';
import { Bar } from 'react-chartjs-2'; 

function Chart({ data, labels }) {
  const initData = {
    labels,
    datasets: data,
  };

  return <Bar data={initData} />;
}

export default Chart; 