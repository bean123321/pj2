import React, { memo } from "react";
import annonAvatar from "../assets/anh11.png";
import icons from "../ultils/icons";

const { BsDot, BsTelephoneFill, SiZalo } = icons;
const BoxInfo = ({ userData }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src="data:image/jpeg;base64,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"
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
