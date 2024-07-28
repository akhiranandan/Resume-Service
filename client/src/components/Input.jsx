
const Input = ({ label, value, name, handleChange }) => {
  return (
    <div>
      <label>{label} :</label>
      <input type="text" name={name} value={value} onChange={handleChange}/>
    </div>
  );
};

export default Input;
