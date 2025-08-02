import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#06b6d4"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    console.log("RecentIncomeWithChart - Raw data:", data);
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    console.log("RecentIncomeWithChart - Chart data:", dataArr);
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Last 30 Days Income</h5>
      </div>

      {chartData && chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No income data available</p>
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
