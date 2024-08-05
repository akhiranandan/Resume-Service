import React from "react";

const Input = ({ label, name, register, isRequired }) => {
  return (
    <div>
      <label>{label} :</label>
      <input type="text" {...register(name, { required: isRequired })} />
    </div>
  );
};

export default Input;
