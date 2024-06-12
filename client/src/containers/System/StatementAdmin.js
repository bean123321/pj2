import React from "react";
import ChartAdmin from "../../components/ChartAdmin";
const StatementAmdin = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Thống kê báo cáo
      </h1>
      <div className="mt-[30px]">
        <ChartAdmin />
      </div>
    </div>
  );
};

export default StatementAmdin;
