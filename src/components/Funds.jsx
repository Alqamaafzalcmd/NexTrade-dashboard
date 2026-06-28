import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import api from "./Checker";

const Funds = () => {
  const { openAddFundsWindow, openWithdrawFundsWindow } =
    useContext(GeneralContext);

  const [info, setInfo] = useState({
    funds: 0,
    holdingValue: 0,
    usedMargin: 0,
    positionValue: 0,
  });

  useEffect(() => {
    try {
      let fetchdata = async () => {
        let res = await api.get("/users/info", {
          withCredentials: true,
        });
        setInfo(res.data);
      };

      fetchdata();
    } catch (err) {}
  }, [info]);

  return (
    <>
      <div className="funds-page text-muted">
        <div className="row mt-5 align-items-start">
          <div className="col-md-6">
            <div className="funds-card">
              <h5>Funds Overview</h5>

              <div className="fund-item">
                <span>Available Cash</span>
                <span>&#8377;{info.funds.toFixed(3)}</span>
              </div>

              <div className="fund-item">
                <span>Holdings Value</span>
                <span>&#8377;{info.holdingValue.toFixed(3)}</span>
              </div>

              <div className="fund-item">
                <span>Used Margin</span>
                <span>&#8377;{info.usedMargin.toFixed(3)}</span>
              </div>

              <div className="fund-item">
                <span>Positions Value</span>
                <span>&#8377;{info.positionValue.toFixed(3)}</span>
              </div>

              <div className="fund-item total">
                <span>Total Portfolio</span>
                <span>
                  &#8377;
                  {(
                    Number(info.funds) +
                    Number(info.positionValue) +
                    Number(info.holdingValue)
                  ).toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="action-card">
              <h5>Manage Funds</h5>

              <p>Instant, zero-cost fund transfers with UPI</p>

              <div className="btn-group-custom">
                <Link className="btn add-btn" onClick={openAddFundsWindow}>
                  Add Funds
                </Link>

                <Link
                  className="btn withdraw-btn"
                  onClick={openWithdrawFundsWindow}
                >
                  Withdraw
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="commodity-card mt-5">
          <p>You don't have a commodity account</p>
          <Link className="btn commodity-btn">Open Account</Link>
        </div>
      </div>
    </>
  );
};

export default Funds;
