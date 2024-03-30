import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anh11.png";
import { blobToBase64 } from "../ultils/Common/tobase64";
const UserI = () => {
  const { currentData } = useSelector((state) => state.user);
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatar"
            className="w-10 h-10 object-cover rounded-full border-2 shadow-md border-white"
          />
          <div className="flex flex-col justify-center">
            <span>
              Xin chào,
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            <span>
              Mã tài khoản:
              <span className="font-medium">
                {currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserI;
