import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  const { openAddFundsWindow, openWithdrawFundsWindow } =
    useContext(GeneralContext);
    
  return (
    <>
      <div className="funds-page text-muted">
        <div className="row mt-5 align-items-start">
          <div className="col-md-6">
            <div className="funds-card">
              <h5>Funds Overview</h5>

              <div className="fund-item">
                <span>Available Cash</span>
                <span>₹85,000</span>
              </div>

              <div className="fund-item">
                <span>Holdings Value</span>
                <span>₹35,000</span>
              </div>

              <div className="fund-item">
                <span>Used Margin</span>
                <span>₹5,000</span>
              </div>

              <div className="fund-item">
                <span>Positions Value</span>
                <span>₹15,000</span>
              </div>

              <div className="fund-item total">
                <span>Total Portfolio</span>
                <span>₹1,35,000</span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="action-card">
              <h5>Manage Funds</h5>

              <p>Instant, zero-cost fund transfers with UPI</p>

              <div className="btn-group-custom">
                <Link className="btn add-btn" onClick>Add Funds</Link>

                <Link className="btn withdraw-btn">Withdraw</Link>
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
