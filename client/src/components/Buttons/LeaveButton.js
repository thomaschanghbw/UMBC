import React, { useState, useEffect, useContext } from "react";
import { LogOut } from "react-feather";
import PropTypes from "prop-types";

import DailyContext from "src/contexts/DailyContext";
import SocketContext from "src/contexts/SocketContext";
const debug = require("debug")("app:LeaveButton");

LeaveButton.propTypes = {};

export default function LeaveButton(props) {
  const { enableLeave, leaveCall } = useContext(DailyContext);
  const { setRoom } = useContext(SocketContext);

  return (
    <div
      className="bg-red-600 hover:bg-red-500 py-2 px-3 rounded-lg flex items-center cursor-pointer text-white"
      onClick={() => {
        if (enableLeave) {
          leaveCall();
          setRoom(null);
          updateSelf({ status: "idle" });
        }
      }}
    >
      <LogOut size={24} color="white" />
      <div className="text-xl ml-2">Leave</div>
    </div>
  );
}
