import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import roof6 from "../../assets/roof6.png";
import { Button, UserI } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";
import menuManage1 from "../../ultils/menuManage1";
import menuManage2 from "../../ultils/menuManage2";

const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div ref={headerRef} className="w-3/5">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={roof6}
            alt="roof6"
            className="w-[200px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <small>NhaTot.com xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <UserI />
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col z-40">
                  {currentData?.accountType === 1
                    ? menuManage.map((item) => (
                        <Link
                          className="flex items-center gap-2 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item.path}
                        >
                          {item.icon}
                          {item.text}
                        </Link>
                      ))
                    : currentData?.accountType === 0
                    ? menuManage1.map((item) => (
                        <Link
                          className="flex items-center gap-2 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item.path}
                        >
                          {item.icon}
                          {item.text}
                        </Link>
                      ))
                    : currentData?.accountType === 3 &&
                      menuManage2.map((item) => (
                        <Link
                          className="flex items-center gap-2 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item.path}
                        >
                          {item.icon}
                          {item.text}
                        </Link>
                      ))}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-600 border-gray-200 py-2 flex items-center gap-2"
                    onClick={() => {
                      dispatch(actions.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          {(currentData?.accountType === 1 ||
            currentData?.accountType === 3) && (
            <Button
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-secondary2"
              IcAfter={AiOutlinePlusCircle}
              onClick={() => navigate("he-thong/tao-moi-bai-dang")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
