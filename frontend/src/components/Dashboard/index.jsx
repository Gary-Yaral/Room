import { useCallback, useState, useEffect } from "react";
import "./css/Dashboard.css";
import "./css/forms.css";
import "./css/custom-table.css";
import axios from 'axios' 
import { ButtonUnique } from "./components/ButtonUnique";
import { buttons } from "./constants/paneOptions";
import userIcon from "./assets/user-icon.png";
import { Outlet, useNavigate } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";


function Dashboard() {
  const [isCentered, setIsCentered] = useState(false);
  const { info:{ teacher, token } } = useSelector(({logged}) =>  logged)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const handleBars = useCallback((e) => {
    setIsCentered(true)
  })

  const handleClose = useCallback((e) => {
    setIsCentered(false)
  })

  return (
    <div className="dashboard">
      <section className={`dashboard-options ${isCentered ?"pane-centered": "pane-hidden"}`}>
        <div className="btn-close" onClick={handleClose}>
          <AiOutlineClose />
        </div>
        {buttons.map((btn, index) => {
          let keyProp = `btnOpt-${index}`;
          return (
            <ButtonUnique
              id={keyProp}
              key={keyProp}
              text={btn[0]}
              icon={btn[1]}
              list={btn[2]}
              path={btn[3] && btn[3]}
            />
          );
        })}
      </section>
      <section className="dashboard-pane">
        <nav className="pane-nav">
          <div className="hamburguer" onClick={handleBars}>
            <HiBars3CenterLeft />
          </div>
          <div className="section-user">
            <div className="username">{teacher && `${teacher.name} ${teacher.lastname}`}</div>
            <img className="user-photo" src={userIcon} alt="" />
          </div>
        </nav>
        <section className="pane-view">
          <Outlet />
        </section>
      </section>
    </div>
  );
}

export { Dashboard };
