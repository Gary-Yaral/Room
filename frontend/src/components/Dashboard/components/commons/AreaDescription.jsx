export const AreaDescription = ({ title, name, register, errors }) => {
  return (
    <div className="container-input">
      <label htmlFor="description">{title}</label>
      <textarea
        className="textarea"
        {...register(name, {
          required: true,
          pattern: /^[¡!¿?a-zA-Z0-9áéíóú\s-.,]{1,250}$/
        })}
      ></textarea>
      {errors[name]?.type === "required" && (
        <sub className="error">{`Este campo es requerido`}</sub>
      )}
      {errors[name]?.type === "pattern" && (
        <sub className="error">{`Solo se permiten letras, números, guiones, puntos, comas, espacios, signos de preguntas, de admiración y máximo 250 caracteres`}</sub>
      )}
    </div>
  );
};
