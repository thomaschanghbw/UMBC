import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const debug = require("debug")("app:Home");

Home.propTypes = {};

export default function Home(props) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-red-500 py-8 px-8">Help</div>
      <div className="flex-1 flex-row py-8 px-8 bg-blue-500 border border-orange-600">
        <div className="bg-red-200">Heel</div>
        <div>Yo</div>
      </div>
    </div>
  );
}
