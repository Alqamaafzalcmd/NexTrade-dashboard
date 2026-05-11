import React ,{useEffect, useState} from "react";

// import { positions } from "../data/data";
import axios from "axios";


const Positions = () => {

    let [allPositions, setAllPositions] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/allPositions")
      .then((res) => {
        // console.log(res.data);
        setAllPositions(res.data);
      })
    },[]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              const profitClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                //product: "CNC",
                // name: "JUBLFOOD",
                // qty: 1,
                // avg: 3124.75,
                // price: 3082.65,
                // net: "+10.04%",
                // day: "-1.35%",
                // isLoss: true,
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  {/* change */}
                  <td>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
