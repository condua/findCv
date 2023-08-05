// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route,Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const PrivateRoute = ({ path, element, Roles }) => {
  //create a location variale to store location
  const location = useLocation();

  //auth have used to get data by useSelector
  const auth = useSelector((state) => state.auth.data);
  if(auth === null)
  {
    return <Navigate to="/login" />
  }
  
  // Roles = auth.role
  console.log(auth?.role)
  const isAuthorized = auth.role !== null && Roles.includes(auth.role);
  console.log(Roles.includes(auth.role))


  // Check if the user is authenticated and if their role is included in the allowedRoles array
  if (isAuthorized !== true) {
    // Redirect to a specific route when the user doesn't have the correct role
    return <Navigate to="/404" />;
  }

  return <Outlet />;

  // if (auth.role === "CANDIDATE") {
  //   // Redirect to a specific route when the user doesn't have the correct role
  //   return <Navigate to="/" />;
  // }
  // if (auth.role === "INTERVIEWER") {
  //   // Redirect to a specific route when the user doesn't have the correct role
  //   return <Navigate to="/interviewer" />;
  // }
  // if (auth.role === "RECRUITER") {
  //   // Redirect to a specific route when the user doesn't have the correct role
  //   return <Navigate to="/recruitment" />;
  // }
  // if (auth.role === "ADMIN") {
  //   // Redirect to a specific route when the user doesn't have the correct role
  //   return <Navigate to="/admin" />;
  // }
  // return <Outlet />;
};

export default PrivateRoute;
