import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import Profile from "./Main/Profile";
import axios from "axios";


const Menu = () => {
  const [selectMenu, setSelectMenu] = useState(0);
  const { isProfileOpen, toggleProfile } = useContext(GeneralContext);

  let [info, setInfo] = useState({
    username: "xyz",
    useremail: "xyz@gmail.com",
  });


  useEffect(() => {
    try {
      let fetchdata = async () => {
        let res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/info`,
          {
            withCredentials: true,
          },
        );
        setInfo({
          username: res.data.username,
          useremail: res.data.useremail,
        });
      };

      fetchdata();
    } catch (err) {}
  }, []);

  const handleMenuClick = (index) => {
    setSelectMenu(index);
  };

  const handleProfileClick = () => {
    toggleProfile();
  };

  // css class in index.css
  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectMenu == 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectMenu == 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectMenu == 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectMenu == 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectMenu == 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectMenu == 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{info.username.slice(0,2).toUpperCase()}</div>
          <p className="username">{info.username}</p>
        </div>
        {isProfileOpen && (
          <div className="profile-comps">
            <Profile />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
