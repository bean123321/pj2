import React from "react";
// import logo from "../../assets/logo.png";
import bds from "../../assets/bds.png";
import ctn from "../../assets/ctn.png";
import pt123 from "../../assets/pt123.png";
import tcn from "../../assets/tcn.png";
import ptt from "../../assets/ptt.png";
import roof7 from "../../assets/roof7.png";

const Footer = () => {
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-center items-center gap-6">
      <div className="w-full flex">
        <div className="w-1/4 flex flex-col flex-1 justify-center items-center">
          <a>
            <img src={roof7} alt="roof7" className="w-[400px] h-[70px]" />
          </a>
          <p className="text-sm mt-[20px]">
            NhaTot.com tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh vực
            cho thuê phòng trọ.
          </p>
        </div>
        <div className="w-1/4 flex flex-col flex-1 justify-center items-center">
          <h4 className="font-medium text-sm">Về trang NhaTot.com</h4>
          <ul>
            <li className="text-sm hover:underline py-1">
              <a href="#">Trang chủ</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Giới thiệu</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="w-1/4 flex flex-col flex-1 justify-center items-center">
          <h4 className="font-medium text-sm">Hỗ trợ khách hàng</h4>
          <ul>
            <li className="text-sm hover:underline py-1">
              <a href="#">Câu hỏi thường gặp</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Hướng dẫn đăng tin</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Bảng giá dịch vụ</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Quy định đăng tin</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Giải quyết khiếu nại</a>
            </li>
          </ul>
        </div>
        <div className="w-1/4 flex flex-col flex-1 justify-center items-center">
          <h4 className="font-medium text-sm">Liên hệ với chúng tôi</h4>
          <ul>
            <li className="text-sm hover:underline py-1">
              <a href="#">Zalo</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Facebook</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Twitter</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Instagram</a>
            </li>
            <li className="text-sm hover:underline py-1">
              <a href="#">Telegram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex pt-[20px]">
        <div className="font-medium mt-[15px] text-sm">
          Cùng hệ thống LBKCorp:
        </div>
        <div className="ml-[5px]">
          <a>
            <img src={bds} alt="bds" />
          </a>
        </div>
        <div className="ml-[5px]">
          <a>
            <img src={ctn} alt="ctn" className="h-[50px]" />
          </a>
        </div>
        <div className="ml-[5px] h-[50px]">
          <a>
            <img src={tcn} alt="tcn" className="h-[50px]" />
          </a>
        </div>
        <div className="ml-[5px]">
          <a>
            <img src={roof7} alt="roof7" className="w-[200px] h-[50px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
