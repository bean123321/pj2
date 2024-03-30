import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { IoHomeOutline } from "react-icons/io5";
import { MdApartment } from "react-icons/md";
import { LiaCampgroundSolid } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as actions from "../store/actions";

const Chart = () => {
  const dispatch = useDispatch();
  const { postOfCurrent } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyPosts, setMonthlyPosts] = useState([]);

  useEffect(() => {
    const postsInSelectedYear = postOfCurrent.filter(
      (post) => new Date(post.createdAt).getFullYear() === selectedYear
    );

    const monthlyPostsData = [];
    for (let i = 1; i <= 12; i++) {
      const postsInMonth = postsInSelectedYear.filter(
        (post) => new Date(post.createdAt).getMonth() + 1 === i
      ).length;
      monthlyPostsData.push({
        name: `${i}`,
        "Bài đăng ": postsInMonth,
      });
    }
    setMonthlyPosts(monthlyPostsData);
  }, [selectedYear, postOfCurrent]);

  const handleChangeYear = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Tính số lượng bài đăng
  const numberOfCTCHPosts = postOfCurrent.filter(
    (post) => post.categoryCode === "CTCH"
  ).length;
  const numberOfCTMBPosts = postOfCurrent.filter(
    (post) => post.categoryCode === "CTMB"
  ).length;
  const numberOfCTPTPosts = postOfCurrent.filter(
    (post) => post.categoryCode === "CTPT"
  ).length;
  const numberOfNCTPosts = postOfCurrent.filter(
    (post) => post.categoryCode === "NCT"
  ).length;
  return (
    <div style={{ textAlign: "center" }}>
      <div className="flex flex-col">
        <div>
          <span className="font-medium text-2xl">Số bài đăng</span>
          <div className="flex gap-4 mt-[20px]">
            <div className="flex-1 text-center bg-[#F73859] h-[150px] font-bold rounded-md">
              <div className="flex items-center justify-center space-x-4 mt-[30px]">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-semibold">
                    {numberOfCTCHPosts}
                  </span>
                  <span className="text-xl">Căn hộ</span>
                </div>
                <span>
                  <MdApartment size={70} />
                </span>
              </div>
            </div>
            <div className="flex-1 text-center bg-[#F73859] h-[150px] font-bold rounded-md">
              <div className="flex items-center justify-center space-x-4 mt-[30px]">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-semibold">
                    {numberOfCTMBPosts}
                  </span>
                  <span className="text-xl">Mặt bằng</span>
                </div>
                <span>
                  <LiaCampgroundSolid size={70} />
                </span>
              </div>
            </div>
            <div className="flex-1 text-center bg-[#F73859] h-[150px] font-bold rounded-md">
              <div className="flex items-center justify-center space-x-4 mt-[30px]">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-semibold">
                    {numberOfCTPTPosts}
                  </span>
                  <span className="text-xl">Phòng trọ</span>
                </div>
                <span>
                  <HiOutlineHome size={70} />
                </span>
              </div>
            </div>
            <div className="flex-1 text-center bg-[#F73859] h-[150px] font-bold rounded-md">
              <div className="flex items-center justify-center space-x-4 mt-[30px]">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-semibold">
                    {numberOfNCTPosts}
                  </span>
                  <span className="text-xl">Nhà ở</span>
                </div>
                <span>
                  <IoHomeOutline size={70} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[100px] my-[30px]">
          <span className="font-medium text-2xl">
            Thống kê số bài đăng theo tháng
          </span>
          <div className=" flex mt-[20px]">
            <BarChart
              width={1000}
              height={500}
              data={monthlyPosts}
              margin={{
                top: 5,
                right: 35,
                left: 35,
                bottom: 15,
              }}
              barSize={30}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                label={{ value: "Tháng", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                ticks={[0, 10, 20, 30, 40, 50, 60]}
                label={{
                  value: "Số lượng",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="Bài đăng "
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
            <select
              value={selectedYear}
              onChange={handleChangeYear}
              className="px-3 py-1 bg-gray-200 rounded-md w-[100px] h-[30px]"
            >
              {Array.from({ length: 11 }, (_, index) => (
                <option key={2020 + index} value={2020 + index}>
                  {2020 + index}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
