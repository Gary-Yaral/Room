import { useEffect } from "react";
import { useState } from "react";

export const CustomSelect = ({
  title,
  prop,
  name,
  options,
  register,
  errors,
  letterA,
  isProp,
}) => {

  const [ isArray, setArray ] = useState(false)

  const createText = (opt) => {
    let value = ""
      let last = prop.length - 1
      prop.forEach((key, index) => {
        if(index !== last) {
          value += opt[key] + " "
        } else {
          value += opt[key] 
        }
      })
      return value
  }
  
  useEffect(() => {
    if(Array.isArray(prop)) setArray(true)
  }, [])

  return (
    <div className="container-input">
      <label htmlFor={name}>{title}</label>
      <select
        className="custom-select"
        {...register(name, {
          required: true,
        })}
      >
        <option value="">
          Seleccione {letterA ? "la" : "el"} {title.toLowerCase()}
        </option>
        {options.map((opt, index) => {
          let key = `${name}-${index + 1}`;
          return (
            <option value={isProp ? opt.id : opt} key={key}>
              {isArray && createText(opt)}
              {isProp ? opt[prop] : opt }
            </option>
          );
        })}
      </select>
      {errors[name]?.type === "required" && (
        <sub className="error">{`Este campo es requerido`}</sub>
      )}
    </div>
  );
};
