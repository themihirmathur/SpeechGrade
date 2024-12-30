import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Class performance based on levels",
  is3D: true,
};
export function PieChart({ data }) {
    
  const chartData = [
    ["index", "value"],
    ...data.map((value, index) => [index + 1, value]),
  ];

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}


