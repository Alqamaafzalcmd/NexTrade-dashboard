import React,{useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, Bounce } from "react-toastify";
import api from "../Checker"
const toastConfig = {
  position: "top-center",
  autoClose: 500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

function Profile() {
   let [info, setInfo] = useState({
     username:"xyz",
     useremail:"xyz@gmail.com"
   });

   useEffect(() => {
     try {
       let fetchdata = async () => {
         let res = await api.get("/users/info", {
           withCredentials: true,
         });
         setInfo({
          username:res.data.username,
          useremail:res.data.useremail
         });
       };

       fetchdata();
     } catch (err) {}
   }, []);

  let handleLogoutClick = () => {
    axios
      .get("/auth/logout",{withCredentials:true})
      .then(() => {
     
         Swal.fire({
           title: "Your Session Expired",
           text: "Loging out from dashboard",
           icon: "warning",
           timer: 5000,
           timerProgressBar: true,
           showConfirmButton: false,
           allowOutsideClick: false,
           allowEscapeKey: false,
           allowEnterKey: false,
         }).then(
           setTimeout(() => {
             window.location.href = import.meta.env.VITE_FRONTEND_URL;
           }, 5000),
         );
      })
      .catch((err) => {
       toast(err.response.data.message, toastConfig);
      });
  };
  return (
    <div
      className="card shadow-sm mx-auto text-muted"
      style={{ width: "300px" }}
    >
      <div className="ps-3 pt-3 mb-2">
        <h5>NexTrade User</h5>
        <p> {info.useremail}</p>
      </div>
      <hr className="m-0" style={{ height: "1px" }} />
      <ul className="list-unstyled profile-list">
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-circle-user "></i>
            <span>My Profile / Setting</span>
          </div>
        </li>
        <hr className="m-0" style={{ height: "1px" }} />
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-circle-dot "></i>
            <span>Console</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-circle-dot "></i>
            <span>Coin</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-headset"></i>
            <span>Support</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-user-plus "></i>
            <span>Invite Friends</span>
          </div>
        </li>
        <hr className="m-0" style={{ height: "1px" }} />
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-user-plus "></i>
            <span>Tour Kite</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-keyboard "></i>
            <span>KeyBoard Shortcuts</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center text-decoration-none text-muted">
            <i className="fa-solid fa-circle-question "></i>
            <span>Help</span>
          </div>
        </li>
        <li>
          <div
            onClick={handleLogoutClick}
            className="d-flex align-items-center text-decoration-none text-muted"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </div>
        </li>
        <hr className="m-0" style={{ height: "1px" }} />
      </ul>
    </div>
  );
}

export default Profile;
