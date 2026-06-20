import react, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Link } from "react-router-dom";


const AddFunds = () => {
  const [field, setField] = useState();
  const { closeFundsWindow } = useContext(GeneralContext);
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
        onChange={(e) => setField(e.target.value)}
        value={field}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-blue">Add</button>

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
