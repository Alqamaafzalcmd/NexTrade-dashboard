import react, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import axios from "axios";
import GeneralContext from "./GeneralContext";

function SellActionWindow({uid}) {
     const { openSellWindow, closeBuySellWindow } = useContext(GeneralContext);

     const [stockQuantity, setStockQuantity] = useState(1);
     const [stockPrice, setStockPrice] = useState(0.0);
     const [product, setProduct] = useState("CNC");

     const handleBuyClick = () => {
       console.log(`selling the stock from ${product} .....`);
       closeBuySellWindow();
     };

     const handleCancellClick = () => {
        closeBuySellWindow();
     };


  return (
    <div
      className="card buy-window shadow-sm p-4 mx-auto"
      style={{ maxWidth: "400px", backgroundColor:"#fafdf9" }}
    >
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
          Sell
        </button>

        <button
          className="btn btn-grey flex-grow-1"
          onClick={handleCancellClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


export default SellActionWindow;