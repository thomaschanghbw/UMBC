import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import MicButton from "./Buttons/MicButton";
import CamButton from "./Buttons/CamButton";
import LeaveButton from "./Buttons/LeaveButton";
const debug = require("debug")("app:Tray");

export default function Tray(props) {
  return (
    <div className="flex flex-row h-24 w-full self-end items-center  bg-blue-700">
      {/* empty third */}
      <div className="w-1/3 h-full"></div>
      {/* call icons */}
      <div className="flex flex-row items-center justify-center w-1/3 h-full">
        <MicButton />
        <CamButton />
      </div>
      <LeaveButton />
    </div>
  );
}
