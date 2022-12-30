export const CustomInput = ({
  title,
  name,
  register,
  errors,
  pattern,
  message,
  type
}) => {
  return (
    <div className="container-input">
      <label htmlFor="date">{title}</label>
      <input
        type={type}
        className="custom-input"
        {...register(name, {
          required: true,
          pattern,
        })}
      />
      {errors[name]?.type === "required" && (
        <sub className="error">{`Este campo es requerido`}</sub>
      )}
      {errors[name]?.type === "pattern" && (
        <sub className="error">{message}</sub>
      )}
    </div>
  );
};
