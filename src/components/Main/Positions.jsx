import React, { useEffect, useState } from "react";

// import { positions } from "../data/data";
import axios from "axios";
import api from "../Checker";


const Positions = () => {
  let [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:8080/positions", { withCredentials: true })
      .then((res) => {
        // console.log(res);
        setAllPositions(res.data);
      });
  }, [allPositions]); // fetch the latest record

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
                const dayNetChange = stock.dayChange >= 0 ? "profit" : "loss";
                const dayltp = stock.ltp >= 0 ? "profit" : "loss";
                const daypnl = stock.pnl >= 0 ? "profit" : "loss";
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.instrument}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avgCost.toFixed(3)}</td>
                  <td className={dayltp}>{stock.ltp.toFixed(3)}</td>
                  <td className={daypnl}>{stock.pnl.toFixed(3)}</td>
                  <td className={dayNetChange}>{stock.netChange.toFixed(3)}</td>
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
