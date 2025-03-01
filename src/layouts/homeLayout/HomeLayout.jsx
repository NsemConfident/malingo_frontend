import React from "react";
import HomeNavBar from "../../components/sections/homeNavBar/HomeNavBar";

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-blue-500 text-white p-4">Header</header> */}
      <HomeNavBar />
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">Footer</footer>
    </div>
  );
};

export default HomeLayout;
