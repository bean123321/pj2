import React from "react";
import Chart from "../../components/Chart";
const Statement = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Thống kê
      </h1>
      <div className="mt-[30px]">
        <Chart />
      </div>
    </div>
  );
};

export default Statement;
