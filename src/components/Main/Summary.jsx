import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../Checker";

const Summary = () => {
  let [info, setInfo] = useState({
    funds: 0,
    holdingValue: 0,
    usedMargin: 0,
    positionValue: 0,
    holdingCount: 0,
    investment: 0,
    pnl: 0,
    pnlPercent: 0,
  });

  useEffect(() => {
    try {
      let fetchdata = async () => {
        let res = await api.get("/users/info", {
          withCredentials: true,
        });

        // console.log(res);
        setInfo(res.data);
      };

      fetchdata();
    } catch (err) {
      console.log(err);
    }
  },[]);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{info.funds.toFixed(2)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{info.usedMargin.toFixed(2)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{info.funds.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({info.holdingCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {info.pnl > 0 ? "+" : ""}
              {info.pnl.toFixed(2)}{" "}
              <small>
                {info.pnlPercent > 0 ? "+" : ""}
                {info.pnlPercent.toFixed(2)}
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{info.holdingValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{info.investment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
