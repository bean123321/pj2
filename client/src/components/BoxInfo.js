import React, { memo } from "react";
import annonAvatar from "../assets/anh11.png";
import icons from "../ultils/icons";

const { BsDot, BsTelephoneFill, SiZalo } = icons;
const BoxInfo = ({ userData }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={annonAvatar}
        alt="avatar"
        className="w-16 h-16 object-cover rounded-full"
      />
      <h3 className="font-medium text-xl">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={30} />
        <span>Đang hoạt động</span>
      </span>
      <a
        href="/"
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
      >
        <BsTelephoneFill />
        {userData?.phone}
      </a>
      <a
        href={`https://zalo.me/${userData?.zalo}`}
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg"
      >
        <SiZalo color="blue" size={35} />
      </a>
    </div>
  );
};

export default memo(BoxInfo);
