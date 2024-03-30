import React from "react";

const Radio = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  return (
    <div className="flex items-center">
      <input
        type={type || "radio"}
        id={keyPayload}
        checked={value} // Đặt checked bằng giá trị của value
        className="w-[18px] h-[18px]"
        onChange={() => setValue(true)} // Đặt giá trị của radio là true khi được chọn
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      <label htmlFor={keyPayload} className="text-sm pl-[5px]">
        {label}
      </label>
      {invalidFields?.some((i) => i.name === keyPayload) && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === keyPayload)?.message}
        </small>
      )}
    </div>
  );
};

export default Radio;
