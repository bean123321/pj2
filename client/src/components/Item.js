import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { RiHeartFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";
// const indexs = [0, 1, 2, 3];
const { GrStar, RiheartFill, RiHeartLine, BsBookmarkStarFill } = icons;
const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  //console.log(isHoverHeart);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(
        <GrStar className="star-item" size={20} color="rgb(245 158 11)" />
      );
    return stars;
  };
  return (
    <div className="w-full flex border-t border-orange-600 py-[10px]">
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[45%] h-[100px] object-cover"
                />
              );
            })}
        <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4">
          {`${images.length} ảnh`}
        </span>
        {/* <span
          className="text-white px-2 rounded-md absolute right-1 bottom-1"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <RiHeartFill size={24} color="red" />
          ) : (
            <RiHeartFill size={24} />
          )}
        </span> */}
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between gap-4 w-full">
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-red-600 font-medium"
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            <span className="text-[14px]">{title}</span>
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between gap-2">
          <span className="font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          }${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="data:image/jpeg;base64,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"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <a href="/" className="bg-blue-700 text-white p-1 rounded-md">
              {`Gọi ${user.phone}`}
            </a>
            <a
              href={`https://zalo.me/${user?.zalo}`}
              className="text-blue-700 p-1 rounded-md border border-blue-700"
              target="_blank"
            >
              Nhắn zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
