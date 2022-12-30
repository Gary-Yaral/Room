
export const InputSpecialty = ({name, register, errors}) => {
  return (
    <div className="container-input">
      <label htmlFor={name}>Especialidad</label>
      <input type="text"
        className="custom-input"
        {...register(name, {
          pattern: /^([áéíóúa-zA-Z\d\,\s]){1,}$/i
        })}
      />
      {errors[name]?.type === 'pattern' && <sub className="error">Solo se permiten letras, números, comas y espacios</sub>}
    </div>
  )
}
