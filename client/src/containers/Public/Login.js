import React, { useState, useEffect } from "react";
import { InputForm, Button, Radio } from "../../components";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
import { path } from "../../ultils/constant";
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
    accountType: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
        </h3>
        <div className="w-full flex flex-col gap-5">
          {isRegister && (
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"HỌ TÊN"}
              value={payload.name}
              setValue={setPayload}
              keyPayload={"name"}
            />
          )}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"SỐ ĐIỆN THOẠI"}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={"phone"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"MẬT KHÂU"}
            value={payload.password}
            setValue={setPayload}
            keyPayload={"password"}
            type="password"
          />
          {isRegister && (
            <div className="flex gap-8">
              <Radio
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label="Tìm kiếm"
                value={payload.accountType === "0"} // Nếu giá trị accountType là 0 thì radio được chọn
                setValue={(value) =>
                  setPayload({ ...payload, accountType: value ? "0" : "1" })
                } // Nếu radio được chọn thì đặt giá trị accountType là 0, ngược lại là 1
                keyPayload={"search"}
              />
              <Radio
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label="Đăng tin"
                value={payload.accountType === "1"} // Nếu giá trị accountType là 1 thì radio được chọn
                setValue={(value) =>
                  setPayload({ ...payload, accountType: value ? "1" : "0" })
                } // Nếu radio được chọn thì đặt giá trị accountType là 1, ngược lại là 0
                keyPayload={"post"}
              />
            </div>
          )}
          <Button
            text={isRegister ? "Đăng kí" : "Đăng nhập"}
            bgColor="bg-secondary1"
            textColor="text-white"
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?
              <span
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                    accountType: "",
                  });
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              {/* <small className="text-[blue] hover:text-[red] cursor-pointer">
                <Link to={`/${path.FORGET_PASSWORD}`}>Bạn quên mật khẩu?</Link>
              </small> */}
              <small
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                    accountType: "0", // Đặt lại giá trị mặc định là 0 khi chuyển sang form đăng ký
                  });
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
