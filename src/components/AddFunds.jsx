import react, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Link } from "react-router-dom";
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


const AddFunds = () => {
  const [field, setField] = useState(0);
  const { closeFundsWindow } = useContext(GeneralContext);

  const handleAddFunds = async () => {
    console.log("handling funds ......");

    try {
      await axios.post(
        "http://localhost:8080/users/addfunds",
        { field: Number(field) },
        { withCredentials: true },
      );

      
      toast.success("funds added successfully", toastConfig);
    } catch (err) {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message, toastConfig);

      console.log(err.response?.data || err.message);
    }
    closeFundsWindow();
  };

  return (
    <div
      className="add-funds card shadow-sm p-4 mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h5 className="mb-3">Add Funds to your Account</h5>

      <input
        type="number"
        name="funds"
        id="funds"
        className="form-control mb-3"
        placeholder="Enter amount"
        step="5"
        min="0"
        max="1e5"
        onChange={(e) => setField(e.target.value)}
        value={field}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-blue" onClick={handleAddFunds}>
          Add
        </button>

        <button className="btn btn-grey" onClick={closeFundsWindow}>
          Cancel
        </button>
      </div>

      <hr />

      <p className="text-muted mb-0">
        Your Initial Funds: <strong>₹500</strong>
      </p>
    </div>
  );
};

export default AddFunds;
