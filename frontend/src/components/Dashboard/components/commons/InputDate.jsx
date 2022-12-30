
export const InputDate = ({title, name, register, errors}) => {
  return (
    <div className="container-input">
      <label htmlFor="date">{title}</label>
      <input type="date"
        className="custom-input"
        {...register(name, {
          required: true,
        })}
      />
      {errors[name]?.type === "required" && (
        <sub className="error">{`Este campo es requerido`}</sub>
      )}
    </div>
  );
}
