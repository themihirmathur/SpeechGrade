import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Student's Performance",
  is3D: true,
};
export function LineMonth({ data }) {
    
  const chartData = [
    ["index", "value"],
    ...data.map((value, index) => [index + 1, value]),
  ];

  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}


