import { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
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


const WithdrawFunds = () => {
  const [field, setField] = useState();
  const { closeFundsWindow } = useContext(GeneralContext);

  let handleWithdrawFunds = async () => {
    try {
      let res = await axios.post(
        "http://localhost:8080/users/withdrawfunds",
        { field: Number(field) },
        { withCredentials: true },
      );

      toast.success(res.data.message, toastConfig);
    } catch (err) {
      toast.error(err.response.data.message, toastConfig);
    }

    closeFundsWindow();
  };

  return (
    <div
      className="add-funds card shadow-sm p-4 mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h5 className="mb-3">Withdraw your Funds</h5>

      <input
        type="number"
        name="funds"
        id="funds"
        className="form-control mb-3"
        placeholder="Enter amount"
        step="5"
        onChange={(e) => setField(e.target.value)}
        value={field}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-blue" onClick={handleWithdrawFunds}>
          Withdraw Funds
        </button>

        <button className="btn btn-grey" onClick={closeFundsWindow}>
          Cancel
        </button>
      </div>

      <hr />

      <p className="text-muted mb-0">
        Your Available Funds: <strong>₹500</strong>
      </p>
    </div>
  );
};

export default WithdrawFunds;
