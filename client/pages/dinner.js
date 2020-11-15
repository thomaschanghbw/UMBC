import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Tray from "src/components/Tray";
import Call from "src/components/Call";
import DailyProvider from "src/contexts/DailyProvider";

const debug = require("debug")("app:Dinner");

Dinner.propTypes = {};

export default function Dinner(props) {
  return (
    <div className="h-screen w-screen">
      {/* // master div // */}
      {/* header/prompt/body/tray master div */}
      <div className="flex flex-col h-full w-full">
        {/* header  */}
        <div className="flex flex-col items-center w-full font-extrabold h-1/5 bg-red-400">
          <div className="pt-4 pb-2 px-8 text-4xl text-white">
            Dinner For 12 Strangers
          </div>
          <div className="pb-4 text-gray-200">
            Come and eat with other people
          </div>
        </div>

        {/* body */}
        <Call />
      </div>
    </div>
  );
}
