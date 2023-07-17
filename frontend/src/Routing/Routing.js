import React, { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Spinner from "../Components/UI/Spinner";


const Routing = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* <Route path="/auth" element={<Outlet />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<Recovery/>} />
        </Route>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobsDetails />} />
        <Route path="/jobs/organization=:org" element={<OrganizationJob />} />
        <Route path="/profile" element={<Outlet />} >
          <Route path=":user" element={<Profile/>}/>
          <Route path=":user/jobPrefernce" element={<JobPreference/>}/>
        </Route> */}
        {/* <Route path="/profile/:user" element={<Profile />} /> */}
        {/* <Route path="/company" element={<Outlet />}>
          <Route path=":user" element={<Company />} />
          <Route path=":user/jobsposted/:slug" element={<CompanyJobDetails />} />
        </Route>
        <Route path="/" element={<Landing/>}/> */}
      </Routes>
    </Suspense>
  );
};

export default Routing;
