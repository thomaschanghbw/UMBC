import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const debug = require("debug")("app:Button");

Button.propTypes = {};

export default function Button(props) {
  function hi() {
    if (props.hi) {
      alert("HI");
    } else {
      alert("bye");
    }
  }

  return (
    <div
      className="bg-red-400 py-2 px-4 cursor-pointer rounded-lg"
      onClick={hi}
    >
      {props.children}
    </div>
  );
}
