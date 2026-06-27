import React, { useContext, useState, useEffect } from "react";
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
import SellActionWindow from "./SellActionWindow";

import axios from "axios";
import DoughnutChart from "./DoughnutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  const { isBuySell, selectedStockUID } = useContext(GeneralContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/watchlist");
      if (res) {
        setWatchlist(res.data);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 50000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price of Stock",
        data: watchlist.map((stock) => stock.currentPrice),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

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
      {isBuySell == "buy" && <BuyActionWindow uid={selectedStockUID} />}
      {isBuySell == "sell" && <SellActionWindow uid={selectedStockUID} />}

      <DoughnutChart data={data} />
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
          <span className={stock.changePercent < 0 ? "down" : "up"}>
            {stock.change} &nbsp;({stock.changePercent > 0 ? "+" : ""}
            {Number(stock.changePercent).toFixed(2)}%) &nbsp;
          </span>
          {stock.change < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className={stock.change < 0 ? "down" : "up"}>
            &nbsp;
            {stock.currentPrice}
          </span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={[stock.symbol, stock.name]}></WatchListActions>
      )}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

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
          <button className="sell" onClick={() => openSellWindow(uid)}>
            Sell
          </button>
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
