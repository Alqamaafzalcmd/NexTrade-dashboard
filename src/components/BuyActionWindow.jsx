import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [product, setProduct] = useState("CNC");
  // console.log(uid);
  const handleBuyClick = async () => {

    console.log(uid);
    const data = {
      symbol: uid[0],
      name: uid[1],
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
      product: product,
    };

    // console.log(product);

    try {
      let destination = product === "MIS" ? "positions" : "holdings";
      axios.post(`http://localhost:8080/${destination}/add`, data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const id = React.useId();

  return (
    <div className="container" id="buy-window" draggable="true">
      <h3
        className="text-muted text-center"
        style={{ color: "#b7b3b3", textAlign: "center" }}
      >
        {uid[0]}
      </h3>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>

          <FormControl>
            <FormLabel id={`${id}-label`}>
              <b>Product</b>
            </FormLabel>
            <RadioGroup
              aria-labelledby={`${id}-label`}
              name="radio-buttons-group"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <FormControlLabel value="CNC" control={<Radio />} label="CNC" />

              <FormControlLabel value="MIS" control={<Radio />} label="MIS" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
