import React, { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

const Spinner = lazy(() => import('../Components/UI/Loading'));
const Homepage = lazy(() => import('../Components/UI/Homepage'));
const SignUp = lazy(() => import('../Components/Forms/SignupForm/Signup'));
const SignIn = lazy(() => import('../Components/Forms/SigninForm/Signin'));
const DashBoard = lazy(()=> import('../Components/DashBoard/DashBoard'));


const Routing = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/auth" element={<Outlet />}>
          <Route path="create" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
        </Route>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    </Suspense>
  );
};

export default Routing;
