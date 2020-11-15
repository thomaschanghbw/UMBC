import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const debug = require("debug")("app:Icebreakers");

Icebreakers.propTypes = {};

export default function Icebreakers(props) {
  return (
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
  );
}
