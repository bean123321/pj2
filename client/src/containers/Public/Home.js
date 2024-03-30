import React, { useEffect } from "react";
import Header from "./Header";
import { Navigation, Search, Footer } from "./index";
import { Intro, Contact } from "../../components";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils/constant";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const location = useLocation();

  if (
    !isLoggedIn &&
    location.pathname !== `/${path.LOGIN}` &&
    location.pathname !== `/${path.FORGET_PASSWORD}`
  ) {
    return <Navigate to={`/${path.LOGIN}`} replace />;
  }

  return (
    <div className="w-full flex gap-6 flex-col items-center h-full">
      <Header />
      <Navigation />
      {isLoggedIn &&
        location.pathname !== `/${path.CONTACT}` &&
        !location.pathname?.includes(path.DETAIL) && <Search />}
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <Footer />
      {/* <div className="h-[500px]"></div> */}
    </div>
  );
};

export default Home;
