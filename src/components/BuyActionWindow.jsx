import React, { useState, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import GeneralContext from "./GeneralContext";

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

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuySellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [product, setProduct] = useState("CNC");

  const handleBuyClick = async () => {
    const data = {
      symbol: uid[0],
      name: uid[1],
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
      product: product,
    };

    try {
      let destination = product === "MIS" ? "positions" : "holdings";
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${destination}/add`,
        data,
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message, toastConfig);
    } catch (err) {
      toast.error(err.response.data.message, toastConfig);
    }
    closeBuySellWindow();
  };

  const handleCancelClick = () => {
    closeBuySellWindow();
  };

  return (
    <div className="card buy-window shadow-sm p-4 mx-auto" style={{ maxWidth: "400px" , backgroundColor:"#fcf5f5"}}>
      <h5 className="mb-3 text-center">{uid[0]}</h5>

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Quantity"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Price"
        step="0.05"
        value={stockPrice}
        onChange={(e) => setStockPrice(e.target.value)}
      />

      <FormControl className="mb-3">
        <FormLabel>
          <b>Product</b>
        </FormLabel>

        <RadioGroup
          row
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          <FormControlLabel value="CNC" control={<Radio />} label="CNC" />

          <FormControlLabel value="MIS" control={<Radio />} label="MIS" />
        </RadioGroup>
      </FormControl>

      <div className="mb-3">
        <small className="text-muted">
          Margin Required: <strong>₹140.65</strong>
        </small>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-blue flex-grow-1" onClick={handleBuyClick}>
          Buy
        </button>

        <button
          className="btn btn-grey flex-grow-1"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
