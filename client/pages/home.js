import React, { useState, useEffect, useContext } from "react";
import App from "../src/components/app.bs";
import SocketContext from "src/contexts/SocketContext";
const debug = require("debug")("app:Home");

Home.propTypes = {};

export default function Home(props) {
  const { updateSelf, hasRoom } = useContext(SocketContext);

  return (
    <div className="w-full h-screen overflow-hidden font-space">
      <App onFormSubmit={updateSelf} hasRoom={hasRoom} />
    </div>
  );
}
