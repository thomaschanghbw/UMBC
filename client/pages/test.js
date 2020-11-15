import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { axios } from "src/utils/utils";
import SocketContext from "src/contexts/SocketContext";
const debug = require("debug")("app:Test");

Test.propTypes = {};

export default function Test(props) {
  const { updateSelf } = useContext(SocketContext);
  useEffect(() => {
    async function f() {
      const resp = await axios.get("/api");
    }

    f();
  }, []);

  function clickMe() {
    debug("UPDATE CLICK ME");
    updateSelf({
      name: "bob",
      hobbies: ["sports", "yoyo"],
      status: "searching",
    });
  }

  return (
    <div className="flex flex-col w-64 bg-red-300 justify-center items-center">
      <div className="flex justify-center items-center">
        <div onClick={clickMe}>CLICK ME</div>
      </div>
      <div>TESTING</div>
      <div>TESTING</div>
    </div>
  );
}
