import React, { useState, useEffect } from "react";

// import {holdings} from "../data/data";
import axios from "axios";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/holdings",{withCredentials:true}).then((res) => {
      // console.log(res);
      setAllHoldings(res.data);
    });
  }, [allHoldings]); // fetch the latest record

  return (
    <>
      {/* <h1>Under Maintenance</h1> */}
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {

              const pnlClass = stock.pnl >= 0 ? "profit" : "loss";
                const netClass = stock.netChange >= 0 ? "profit" : "loss";
                  const dayClass = stock.dayChange >= 0 ? "profit" : "loss";
             

              return (
                <tr key={index}>
                  <td>{stock.instrument}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avgCost.toFixed(3)}</td>
                  <td>{stock.ltp.toFixed(3)}</td>
                  <td>{stock.currentValue}</td>
                  <td className={pnlClass}>{stock.pnl.toFixed(3)}</td>
                  <td className={netClass}>{stock.netChange.toFixed(3)}</td>
                  <td className={dayClass}>{stock.dayChange.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
