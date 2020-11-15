import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icebreakers from "./Icebreakers";
const debug = require("debug")("app:Call");

Call.propTypes = {};

export default function Call(props) {
  return (
    <div className="flex flex-1 flex-row justify-center align-middle bg-blue-300 h-3/5 w-full">
      {/* left third */}
      <div className="flex flex-col mr-20 items-center">
        <div className="pt-6">
          <img
            className="h-20 w-20 rounded-full mr-2"
            src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
          />
        </div>
        <div className="pb-6 self-center">Name</div>
        <div className="pt-6">
          <img
            className="h-20 w-20 rounded-full mr-2"
            src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
          />
        </div>
        <div className="pb-6 self-center">Name</div>
      </div>

      {/* centre third */}
      <Icebreakers />

      {/* right third */}
      <div className="flex ml-20 flex-col items-center">
        <div className="pt-6">
          <img
            className="h-20 w-20 rounded-full mr-2"
            src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
          />
        </div>
        <div className="pb-6 self-center">Name</div>
        <div className="pt-6">
          <img
            className="h-20 w-20 rounded-full mr-2"
            src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
          />
        </div>
        <div className="pb-6 self-center">Name</div>
      </div>
    </div>
  );
}