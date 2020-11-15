import React, { useState, useEffect, useContext } from "react";
import App from "../src/components/app.bs";
import SocketContext from "src/contexts/SocketContext";
const debug = require("debug")("app:Test");

Test.propTypes = {};

export default function Test(props) {
  const { updateSelf } = useContext(SocketContext);

  return (
    <div className="w-full h-screen overflow-hidden font-space">
        <App onFormSubmit={updateSelf}/>
    </div>
  );
}
