import icons from "./icons";
const {
  ImPencil2,
  MdOutlineLibraryBooks,
  BiUserPin,
  RiContactsBook2Fill,
  FcStatistics,
} = icons;
const menuSideBar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserPin />,
  },
  {
    id: 4,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <RiContactsBook2Fill />,
  },
  {
    id: 5,
    text: "Thống kê báo cáo",
    path: "/he-thong/thong-ke",
    icon: <FcStatistics />,
  },
];

export default menuSideBar;
