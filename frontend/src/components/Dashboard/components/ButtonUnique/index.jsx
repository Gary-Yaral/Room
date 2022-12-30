import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../../../constants/router";
import { privateRoutes } from "../../../constants/router";
import { useDispatch } from "react-redux";
import { remove } from "../../../../store/features/teacher/slice";

function ButtonUnique(props) {
  const { text, list, icon, id } = props;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isArray = Array.isArray(list);

  const handleBtnPrimary = useCallback((e) => {
    if (!isArray) {
      let btn = e.target;
      let btnPath = btn.getAttribute("path");

      if (btnPath === publicRoutes.LOGIN) {
        dispatch(remove());
        return navigate(`/${publicRoutes.LOGIN}`);
      }
      
      if (btnPath === privateRoutes.INDEX) {
        return navigate(`/${privateRoutes.DASHBOARD}`);
      }

      navigate(btnPath);
    }

    if (visible) return setVisible(false);
    return setVisible(true);
  });

  const handleBtnSecondary = useCallback((e) => {
    let btn = e.target;
    let btnPath = btn.getAttribute("path");
    navigate(btnPath, { replace: true });
  });

  return (
    <div className="btn-unique">
      <div
        path={!isArray ? list : ""}
        data-id={id}
        onClick={handleBtnPrimary}
        className="btn-main"
      >
        <div className="btn-separator">
          {icon}
          <span>{text}</span>
        </div>

        {
          /* Arrow */
          isArray && (
            <div className="open-close">
              <div className={visible ? "arrow-down" : "arrow-left"}></div>
            </div>
          )
        }
      </div>
      {(visible &&
        isArray) &&
        list.map((btn, index) => {
          let btnKey = `btn-${index}`;
          return (
            <li
              path={btn.url}
              onClick={handleBtnSecondary}
              data-id={btnKey}
              key={btnKey}
              className="btn-option"
            >
              <span>{btn.text}</span>
            </li>
          );
        })}
    </div>
  );
}

export { ButtonUnique };
