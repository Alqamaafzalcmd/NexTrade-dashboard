import React, { useEffect, useState } from "react";

import api from "../Checker";
import VerticalChart from "../VerticalChart";

const Positions = () => {
  let [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:8080/positions", { withCredentials: true })
      .then((res) => {
        setAllPositions(res.data);
      });
  }, [allPositions]); // fetch the latest record

  const labels = allPositions.map((h) => h["instrument"]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Positions",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Avg Price",
        data: allPositions.map((h) => h.avgCost),
        backgroundColor: "rgba(255, 73, 28, 0.5)",
      },
      {
        label: "Stock Current Price",
        data: allPositions.map((stock) => stock.currentValue),
        backgroundColor: "rgba(70, 163, 255, 0.5)",
      },
      {
        label: "Stock PNL",
        data: allPositions.map((stock) => stock.pnl),
        backgroundColor: "rgba(130, 255, 134, 0.5)",
      },
    ],
  };

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

      <VerticalChart options={options} data={data} />
    </>
  );
};

export default Positions;
