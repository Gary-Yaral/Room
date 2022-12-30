export const errorsMessages =  {
  user: "Usuario debe contener mínimo 8 caracteres",
  password: "Contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas y minusculas, números y caracteres especiales"
}

const regEx = {
  user: (value) => /^([a-zA-Z0-9]){10,16}$/.test(value),
  password: (value) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/.test(value)
}

const validateLogin = (login) => {
  let keys = Object.keys(login)
  let counter = 0

  keys.forEach(key => {
    if(login[key]) counter++
  })
  return counter === keys.length
}

const testValue = (field, value) => {
  return regEx[field](value)
}

export { testValue, regEx, validateLogin }
