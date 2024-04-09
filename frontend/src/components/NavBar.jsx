import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import NavItem from "./NavItem";

const NavBar = () => {
  const {user, setUser} = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const logout = () => {
    setUser(null);
  };
  return (
    <nav className=" bg-slate-300 flex justify-between p-4">
      <div className="logo">Logo</div>
      <ul className="flex ">
        <NavItem itemName="Home" itemLink={"/"}/>
        {!user && (
          <NavItem itemName="Login" itemLink={"/login"} />
        )}
        {user && (
          <NavItem itemName={user.username} itemLink={""} />
        )}
        {user && <button
          onClick={logout}
          className="mr-4 hover:scale-125 hover:mx-4 transition-all duration-300 ease-in-out"
        >
          Logout
        </button>}
      </ul>
    </nav>
  );
};

export default NavBar;
