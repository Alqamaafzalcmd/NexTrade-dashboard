import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
      });
  }, [allOrders]);

  
  return (
    <div className="orders">
      {/* <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Mode</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time Stamp</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((stock, index) => {


            const statusClass =
                stock.status === "Pending"
                  ? "pending"
                  : stock.status === "Completed"
                  ? "completed"
                  : stock.status === "Rejected"
                  ? "rejected"
                  : "cancelled";

            console.log(statusClass)

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.mode}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price}</td>
                  <td>{stock.price * stock.qty}</td>
                  <td className={statusClass} style={{ fontSize: "0.8rem" }}>
                    {stock.status}
                  </td>
                  <td style={{ fontSize: "0.8rem" }}>
                    {stock.createdAt.slice(0, 10)}
                  </td>
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
    </div>
  );
};

export default Orders;
