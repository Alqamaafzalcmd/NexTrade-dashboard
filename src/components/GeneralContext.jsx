import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import AddFunds from "./AddFunds";
import WithdrawFunds from "./WithdrawFunds";
import SellActionWindow from "./SellActionWindow";


const GeneralContext = React.createContext({
  // buy -------
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuySellWindow:() => {},

  // funds ----------
  openAddFundsWindow: () => {},
  openWithdrawFundsWindow: () => {},
  closeFundsWindow: () => {},
});

export const GeneralContextProvider = (props) => {

  const [selectedStockUID, setSelectedStockUID] = useState("");

  // buy / sell  action windows
  const [isBuySell, setIsBuySell] = useState(null);
 
  const handleOpenBuyWindow = (uid) => {
    setIsBuySell("buy");
    setSelectedStockUID(uid);
  }
  
   const handleOpenSellWindow = (uid) => {
     setIsBuySell("sell");
     setSelectedStockUID(uid);
   };

    const handleCloseBuySellWindow = () => {
         setIsBuySell(null);
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
        openSellWindow: handleOpenSellWindow,
        closeBuySellWindow: handleCloseBuySellWindow,

        openAddFundsWindow,
        openWithdrawFundsWindow,
        closeFundsWindow,

      }}
    >
      {props.children}
      {isBuySell == "buy" && <BuyActionWindow uid={selectedStockUID} />}
      {isBuySell == "sell" && <SellActionWindow uid={selectedStockUID} />}
      {fundDialog === "add" && <AddFunds />}
      {fundDialog === "withdraw" && <WithdrawFunds />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
