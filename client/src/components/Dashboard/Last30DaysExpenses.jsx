import React, { useEffect, useState } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
   console.log("Last30DaysExpenses - Raw data:", data);
   const result = prepareExpenseBarChartData(data);
   console.log("Last30DaysExpenses - Chart data:", result);
   setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No expense data available</p>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;
