import React from "react";
import anonAvatar from "../../assets/anh11.png";
import { useSelector, useDispatch } from "react-redux";
import menuSideBar from "../../ultils/menuSideBar";
import menuSideBar1 from "../../ultils/menuSideBar1";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { AiOutlineLogout } from "react-icons/ai";
import { blobToBase64 } from "../../ultils/Common/tobase64";
const activeStyle =
  "hover:bg-gray-200 flex items-center gap-2 py-2 font-bold bg-gray-200 rounded-md";
const notActiveStyle =
  "hover:bg-gray-200 flex items-center gap-2 py-2 rounded-md cursor-pointer";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  return (
    <div className="w-[256px] bg-white flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:
          <small className="font-medium">
            {currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
          </small>
        </span>
      </div>
      <div>
        {currentData?.accountType === 1
          ? // Render menuSideBar nếu currentData?.accountType === 1
            menuSideBar.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
                key={item.id}
                to={item?.path}
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))
          : currentData?.accountType === 0
          ? // Render menuSideBar1 nếu currentData?.accountType === 0
            menuSideBar1.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
                key={item.id}
                to={item?.path}
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))
          : null}
        <span
          onClick={() => dispatch(actions.logout())}
          className={notActiveStyle}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
