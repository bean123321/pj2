import React, { useState, useEffect } from "react";
import { text } from "../../ultils/constant";
import { ItemSidebar, RelatedPost } from "../../components";
import { List } from "./index";
import { Pagination } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const SearchDetail = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const location = useLocation();
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">
          {location.state?.titleSearch || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-base text-gray-700">{`${
          location.state?.titleSearch || ""
        } phòng mới xây`}</p>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
          {/* <div className="h-[500px]"></div> */}
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble={true}
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
