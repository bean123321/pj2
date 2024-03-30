import React, { memo, useState, useEffect } from "react";
import icons from "../ultils/icons";
import { getNumbersPrice, getNumbersArea } from "../ultils/Common/getNumbers";
import { getCodes, getCodesArea } from "../ultils/Common/getCode";
const { GrLinkPrevious } = icons;
const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [percent1, setPercent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );
  const [percent2, setPercent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );
  const [activeEl, setActiveEl] = useState("");
  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (percent2 <= percent1) {
        activedTrackEl.style.left = `${percent2}%`;
        activedTrackEl.style.right = `${100 - percent1}%`;
      } else {
        activedTrackEl.style.left = `${percent1}%`;
        activedTrackEl.style.right = `${100 - percent2}%`;
      }
    }
  }, [percent1, percent2]);
  const handleClickTrack = (e, value) => {
    e.stopPropagation();
    const stackEl = document.getElementById("track");
    const stackRect = stackEl.getBoundingClientRect(); //lay kich thuoc trai,phai,tren,duoi
    let percent = value
      ? value
      : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width);
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };
  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };
  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };
  const handleActive = (code, value) => {
    setActiveEl(code);
    let arrMaxMin =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPercent1(0);
        setPercent2(convertto100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPercent1(0);
        setPercent2(convertto100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setPercent1(convertto100(arrMaxMin[0]));
      setPercent2(convertto100(arrMaxMin[1]));
    }
  };
  const handleBeforeSubmit = (e) => {
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 <= percent2 ? percent2 : percent1;
    let arrMinMax =
      percent1 === percent2 && percent1 === 100
        ? [convert100toTarget(min), 9999999]
        : [convert100toTarget(min), convert100toTarget(max)];
    // const gaps =
    //   name === "price"
    //     ? getCodes(arrMinMax, content)
    //     : name === "area"
    //     ? getCodesArea(arrMinMax, content)
    //     : [];
    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} ${
          percent1 === percent2 && percent1 === 100
            ? ""
            : ` - ${convert100toTarget(max)}`
        } ${name === "price" ? "triệu" : "m2"} ${
          percent1 === percent2 && percent1 === 100 ? "trở lên" : ""
        }`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      onClick={() => {
        setIsShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-[50%] h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span
            className="hover:text-red-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                name={name}
                value={defaultText || ""}
                id="default"
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="p-12 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                {percent1 === 100 && percent2 === 100
                  ? `Trên ${convert100toTarget(percent1)} ${
                      name === "price" ? "triệu" : "m2"
                    }  +`
                  : `Từ ${
                      percent1 <= percent2
                        ? convert100toTarget(percent1)
                        : convert100toTarget(percent2)
                    } - ${
                      percent2 >= percent1
                        ? convert100toTarget(percent2)
                        : convert100toTarget(percent1)
                    } ${name === "price" ? "triệu" : "m2"}`}
              </div>
              <div
                id="track"
                onClick={handleClickTrack}
                className="slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full"
              ></div>
              <div
                id="track-active"
                onClick={handleClickTrack}
                className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
              ></div>
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={percent1}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPercent1(+e.target.value);
                  activeEl && setActiveEl("");
                }}
              />
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={percent2}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPercent2(+e.target.value);
                  activeEl && setActiveEl("");
                }}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 100);
                  }}
                >
                  {name === "price"
                    ? "15 triệu + "
                    : name === "area"
                    ? "Trên 90 m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="mt-24">
              <h4 className="font-medium mb-4">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleActive(item.code, item.value)}
                      className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                        item.code === activeEl ? "text-orange-600" : ""
                      }`}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "area" || name === "price") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md uppercase"
            onClick={handleBeforeSubmit}
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
