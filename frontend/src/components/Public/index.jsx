import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { privateRoutes } from "../constants/router";

export const Public = () => {
  const { info } = useSelector(({ logged }) => logged);
  return !info.token ? <Outlet /> : <Navigate replace to={privateRoutes.DASHBOARD} />;
};
