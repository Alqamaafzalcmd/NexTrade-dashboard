import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import AddFunds from "./AddFunds"
import WithdrawFunds from "./WithdrawFunds"

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},

  // funds ----------
  openAddFundsWindow: () => {},
  openWithdrawFundsWindow: () => {},
  closeFundsWindow: () => {},
});

export const GeneralContextProvider = (props) => {

  // buy actions window
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

    const handleOpenBuyWindow = (uid) => {
      setIsBuyWindowOpen(true);
      setSelectedStockUID(uid);
    };

    const handleCloseBuyWindow = () => {
      setIsBuyWindowOpen(false);
      setSelectedStockUID("");
    };


  // funds add and withdraw
  const [fundDialog, setFundDialog] = useState(null);
  const openAddFundsWindow = () => {
    setFundDialog("add");
  };
  const openWithdrawFundsWindow = () => {
    setFundDialog("withdraw");
  };

  const closeFundsWindow = () => {
    setFundDialog(null);
  };


  const handleSetFunds = () => {};

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        openAddFundsWindow,
        openWithdrawFundsWindow,
        closeFundsWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {fundDialog === "add" && <AddFunds />}
      {fundDialog === "withdraw" && <WithdrawFunds />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
