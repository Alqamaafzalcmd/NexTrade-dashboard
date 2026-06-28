import axios from "axios";

import { toast, Bounce } from "react-toastify";
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

import Swal from "sweetalert2";


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});


let isSessionExpired = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (!isSessionExpired && error.response && error.response.status === 401) {
      isSessionExpired = true;
      Swal.fire({
        title: "Your Session Expired",
        text: "Please Login Again",
        icon: "warning",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(
        setTimeout(() => {
          window.location.href = import.meta.env.VITE_FRONTEND_URL;
        }, 5000),
      );
    }

    return Promise.reject(error);
  },
);

export default api;
