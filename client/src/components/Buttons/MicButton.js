import React, { useState, useEffect, useContext } from "react";
import { Mic, MicOff } from "react-feather";
import PropTypes from "prop-types";

import DailyContext from "src/contexts/DailyContext";
const debug = require("debug")("app:MicButton");

export default function MicButton(props) {
  const { isMicOff, setMic, enableCallButtons } = useContext(DailyContext);

  return (
    <div
      className="flex flex-col h-12 w-12 mx-1 items-center justify-center px-6 bg-gray-900 hover:bg-gray-800 rounded-full cursor-pointer"
      onClick={() => enableCallButtons && setMic(isMicOff)}
    >
      {!isMicOff ? (
        <Mic size={24} color="white" />
      ) : (
        <MicOff size={24} color="white" />
      )}
    </div>
  );
}
