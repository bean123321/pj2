import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { apiDeletePost } from "../../services";
import { Button, UpdatePost } from "../../components";
import Swal from "sweetalert2";
const ManagePostAdmin = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postOfCurrentAdmin, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !dataEdit && dispatch(actions.getPosts());
  }, [dataEdit, updateData]);
  useEffect(() => {
    setPosts(postOfCurrentAdmin);
  }, [postOfCurrentAdmin]);
  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);
  //console.log(postOfCurrentAdmin);
  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );
  const handleDeletePost = async (
    postId,
    attributesId,
    overviewId,
    imagesId
  ) => {
    // Hiển thị cửa sổ xác nhận trước khi xóa
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa tin đăng này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Gọi API để xóa tin đăng
        const response = await apiDeletePost(
          postId,
          attributesId,
          overviewId,
          imagesId
        );
        if (response?.data?.err === 0) {
          // Nếu xóa thành công, cập nhật lại dữ liệu
          setUpdateData((prev) => !prev);
          // Hiển thị thông báo thành công
          Swal.fire("Thành công", "Xóa tin đăng thành công", "success");
        } else {
          // Nếu xóa không thành công, hiển thị thông báo lỗi
          Swal.fire("Oops!", "Xóa tin đăng thất bại", "error");
        }
      }
    });
  };
  const handleFilterByStatus = (statusCode) => {
    if (statusCode === 1) {
      const activePost = postOfCurrentAdmin?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (statusCode === 0) {
      const expiredPost = postOfCurrentAdmin?.filter(
        (item) => !checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else if (statusCode === 2) {
      setPosts(postOfCurrentAdmin);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Quản lý tin đăng</h1>
        <select
          onChange={(e) => handleFilterByStatus(+e.target.value)}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="2">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="flex w-full bg-gray-100">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Ảnh đại diện</th>
            <th className="border flex-1 p-2">Tiêu đề</th>
            <th className="border flex-1 p-2">Giá</th>
            <th className="border flex-1 p-2">Ngày bắt đầu</th>
            <th className="border flex-1 p-2">Ngày hết hạn</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>dsgsd</tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr key={item.id} className="flex w-full">
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {item?.overviews?.code
                      ? item.overviews.code.startsWith("#")
                        ? item.overviews.code
                        : `#${item.overviews.code}`
                      : ""}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {`${item?.title?.slice(0, 40)}...`}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {item?.attributes?.price}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {item?.overviews?.created}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1">
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="border px-1 flex justify-center items-center flex-1 gap-4">
                    <Button
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                      text="Sửa"
                      bgColor="bg-green-600"
                      textColor="text-white"
                    />
                    <Button
                      text="Xóa"
                      bgColor="bg-red-600"
                      textColor="text-white"
                      onClick={() =>
                        handleDeletePost(
                          item.id,
                          item.attributesId,
                          item.overviewId,
                          item.imagesId
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePostAdmin;
