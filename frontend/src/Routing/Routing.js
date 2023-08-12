import React, { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

const Spinner = lazy(() => import('../Components/UI/Loading'));
const Homepage = lazy(() => import('../Components/UI/Homepage'));
const SignUp = lazy(() => import('../Components/Forms/Signup'));
const SignIn = lazy(() => import('../Components/Forms/Signin'));

const Routing = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/auth" element={<Outlet />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
