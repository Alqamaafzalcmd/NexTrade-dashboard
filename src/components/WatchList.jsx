import React, { useContext, useState, useEffect } from "react";
// import { watchlist } from "../data/data";
// import { stockData } from "../data/stockData";

import { Tooltip } from "@mui/material";
import Grow from "@mui/material/Grow";

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import BuyActionWindow from "./BuyActionWindow";

import axios from "axios";


const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  const { isBuyWindowOpen, selectedStockUID } = useContext(GeneralContext);

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/watchlist");
      if(res){
         setWatchlist(res.data);
         console.log(res.data);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 50000);

    return () => clearInterval(interval);
  }, []);

  // console.log(watchlist);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx ..."
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              index={index}
              key={index}
            ></WatchListItem>
          );
        })}
      </ul>
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, index }) => {
  const [showWatchlistActions, setWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setWatchListActions(true);
  };

  const handleMouseLeave = (e) => {
    setWatchListActions(false);
  };


  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={index}
    >
      <div className="item">
        <p className={stock.change < 0 ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.change}</span>
          {stock.change < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className={stock.change < 0 ? "down" : "up"}>
            {stock.currentPrice}
          </span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions
          uid={[stock.symbol, stock.name]}
        ></WatchListActions>
      )}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          transitioncomponent={Grow}
        >
          <button className="buy" onClick={() => openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          transitioncomponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          transitioncomponent={Grow}
        >
          <button className="action">
            <BarChartOutlined></BarChartOutlined>
          </button>
        </Tooltip>
        <Tooltip
          title="More"
          placement="top"
          className="action-margin"
          arrow
          transitioncomponent={Grow}
        >
          <button className="action">
            <MoreHoriz></MoreHoriz>
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
