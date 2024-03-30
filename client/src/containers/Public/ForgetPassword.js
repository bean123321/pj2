import React, { useState } from "react";
import { Button, InputForm, InputFormV2 } from "../../components";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {
  //const { currentData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    phone: "",
  });

  const handleSendPassword = async () => {
    try {
      // Tạo mật khẩu ngẫu nhiên
      const randomPassword = nanoid(8); // Tạo mật khẩu ngẫu nhiên gồm 8 ký tự

      // Gửi yêu cầu đặt lại mật khẩu và gửi mật khẩu ngẫu nhiên về số điện thoại
      // Thay thế dòng dưới này bằng hàm hoặc API gửi yêu cầu đặt lại mật khẩu của bạn
      // await sendResetPasswordRequest(phoneNumber, randomPassword);

      // Hiển thị thông báo thành công
      Swal.fire(
        "Thành công !",
        `Một mật khẩu mới đã được gửi đến số điện thoại`,
        "success"
      );
      setPayload({ phone: "" });
    } catch (error) {
      // Xử lý lỗi nếu có
      Swal.fire("Oops !", "Đã xảy ra lỗi. Vui lòng thử lại sau.", "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
        <h3 className="font-semibold text-2xl mb-3">Quên mật khẩu</h3>
        <div className="w-full flex flex-col gap-5">
          <InputFormV2
            name="phone"
            setValue={setPayload}
            value={payload?.phone}
            label="Số điện thoại"
          />
          <Button
            text="Gửi mật khẩu mới"
            bgColor="bg-secondary1"
            textColor="text-white"
            fullWidth
            onClick={handleSendPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
