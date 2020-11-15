import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
      <div className="flex items-center flex-col">
        {/* table */}
        <div className="flex h-64 w-64 rounded-full bg-yellow-600 items-center justify-center">
          <div className="flex text-lg py-3 px-3 rounded-lg bg-white">
            Icebreaker Question
          </div>
        </div>
        {/* generate new qns button */}
        <div className="flex my-5 py-4 px-3 w-auto self-center text-lg rounded-lg bg-green-500">
          Generate New Question
        </div>
      </div>

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
