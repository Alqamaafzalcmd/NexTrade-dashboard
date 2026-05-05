import React from "react";
import { useState } from "react";
import { watchlist } from "../data/data";

import { Tooltip } from "@mui/material";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";

const WatchList = () => {
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
    setWatchListActions(true);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={index}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name}></WatchListActions>
      )}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          transitioncomponent={Grow}
        >
          <button className="buy">Buy</button>
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
        <Tooltip title="More" placement="top" className="action-margin" arrow transitioncomponent={Grow}>
          <button className="action">
            <MoreHoriz></MoreHoriz>
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
