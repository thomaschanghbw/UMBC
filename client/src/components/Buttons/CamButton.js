import React, { useState, useEffect, useContext } from "react";
import { Camera, CameraOff } from "react-feather";

import PropTypes from "prop-types";

import DailyContext from "src/contexts/DailyContext";
const debug = require("debug")("app:CamButton");

CamButton.propTypes = {};

export default function CamButton(props) {
  const { isCameraOff, setCamera, enableCallButtons } = useContext(
    DailyContext
  );

  return (
    <button
      className="flex flex-col h-12 w-12 mx-1 items-center justify-center px-6 bg-gray-900 hover:bg-gray-800 rounded-full cursor-pointer"
      onClick={() => enableCallButtons && setCamera(isCameraOff)}
    >
      {!isCameraOff ? (
        <Camera size={24} color="white" />
      ) : (
        <CameraOff size={24} color="white" />
      )}
    </button>
  );
}
