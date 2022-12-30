import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { publicRoutes } from '../constants/router'

export const Protected = () => {
  const { info } = useSelector(({logged}) => logged)
  return info.token ? <Outlet /> : <Navigate replace to={publicRoutes.LOGIN} />
}
