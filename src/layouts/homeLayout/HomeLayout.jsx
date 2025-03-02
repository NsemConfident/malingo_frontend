import React from "react";
import HomeNavBar from "../../components/sections/homeNavBar/HomeNavBar";

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col  bg-blue-100">
      {/* <header className="bg-blue-500 text-white p-4">Header</header> */}
      <HomeNavBar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default HomeLayout;
