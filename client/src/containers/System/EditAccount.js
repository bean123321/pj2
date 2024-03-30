import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anh11 from "../../assets/anh11.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUploadImages, apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/tobase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
const EditAccount = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
    // password: currentData?.password || "",
  });
  const handleSubmit = async () => {
    const invalidCounter = validate(payload, setInvalidFields);
    if (invalidCounter === 0) {
      const response = await apiUpdateUser(payload);
      if (response?.data?.err === 0) {
        Swal.fire(
          "Thành công",
          "Chỉnh sửa thông tin thành công",
          "success"
        ).then(() => {
          dispatch(getCurrent());
        });
      } else {
        Swal.fire("Oops!", "Chỉnh sửa thông tin không thành công", "error");
      }
    }
  };
  const handleUploadFile = async (e) => {
    // const image = e.target.files[0];
    // const formData = new FormData();
    // formData.append("file", image);
    // formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    // const response = await apiUploadImages(formData);
    // if (response.status === 200) {
    //   setPayload((prev) => ({
    //     ...prev,
    //     avatar: response.data.secure_url,
    //   }));
    // }
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full mb-6">
          <InputReadOnly
            value={
              `#${currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}` || ""
            }
            label="Mã thành viên"
            direction="flex-row"
          />
          <InputReadOnly
            value={currentData?.phone}
            editPhone
            label="Số điện thoại"
            direction="flex-row"
          />
          <InputFormV2
            name="name"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            direction="flex-row"
            value={payload?.name}
            label="Tên hiển thị"
          />
          {/* <InputFormV2
            name="password"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            direction="flex-row"
            value={payload?.password}
            label="Mật khẩu"
          /> */}
          <InputFormV2
            name="zalo"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            direction="flex-row"
            value={payload?.zalo}
            label="Zalo"
          />
          <InputFormV2
            name="fbUrl"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            direction="flex-row"
            value={payload?.fbUrl}
            label="Facebook"
          />
          {/* <div className="flex">
            <label className="w-48 flex-none" htmlFor="password">
              Mật khẩu
            </label>
            <small className="flex-auto text-blue-500 h-12 cursor-pointer">
              Đổi mật khẩu
            </small>
          </div> */}
          <div className="flex mb-6">
            <label className="w-48 flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
              <img
                src={payload.avatar || anh11}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover"
              />
              {invalidFields?.some((item) => item.name === "avatar") && (
                <small className="text-red-500 block w-full">
                  {
                    invalidFields?.find((item) => item.name === "avatar")
                      ?.message
                  }
                </small>
              )}
              <input
                onChange={handleUploadFile}
                type="file"
                id="avatar"
                className="appearance-none my-4"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
