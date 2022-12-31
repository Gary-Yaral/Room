import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialLogin, initialState } from "./utils/defaultValues";
import { useDispatch } from "react-redux";
import { save } from "../../store/features/teacher/slice";
import { loginRoute } from "../Dashboard/constants/routes";
import { privateRoutes } from "../constants/router";
import "./css/Login.css";
import {
  testValue,
  validateLogin,
  errorsMessages,
  regEx,
} from "./utils/validateLogin";

const Login = () => {
  const [loginData, setLoginData] = useState(initialLogin);
  const [loginValid, setLoginValid] = useState(initialState);
  const [errors, setErrors] = useState(initialLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateLogin(loginValid)) {
      axios.post(loginRoute.LOGIN, loginData).then((res) => {
        let { data } = res;
        if (data.status) {
          let { teacher, token } = data
          dispatch(save({ teacher, token }));
          return navigate(`/${privateRoutes.DASHBOARD}`, {replace: true});
        }
      });
    }
  });

  const handleChange = useCallback((e) => {
    let field = e.target;
    let value = field.value.replaceAll(" ", "");

    if (field.name === "user" && value !== "") {
      let isDNI = regEx.user(value);
      if (isDNI) setLoginData({ ...loginData, [field.name]: value });
    } else {
      setLoginData({ ...loginData, [field.name]: value });
    }

    if (testValue(field.name, value)) {
      setErrors({ ...errors, [field.name]: "" });
      setLoginValid({ ...loginValid, [field.name]: true });
      return;
    }

    setLoginValid({ ...loginValid, [field.name]: false });
    setErrors({ ...errors, [field.name]: errorsMessages[field.name] });
  });

  return (
    <div className="container-login">
      <div className="card-login">
        <h3 className="card-title">Iniciar Sesión</h3>
        <form className="form-login" onSubmit={handleSubmit}>
          <section className="block-input">
            <label htmlFor="user" className="label">
              Usuario
            </label>
            <input
              type="text"
              name="user"
              id="user"
              value={loginData.user}
              onChange={handleChange}
            />
            <sub className="error">{errors["user"]}</sub>
          </section>
          <section className="block-input">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <sub className="error">{errors["password"]}</sub>
          </section>
          <input type="submit" className="login" value="Ingresar" />
        </form>
        <sub className="copywrite">Powered by Gary Yaral</sub>
      </div>
    </div>
  );
};

export { Login };
