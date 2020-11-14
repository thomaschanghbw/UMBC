import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { axios } from "../src/utils/utils";
const debug = require("debug")("app:Test");

Test.propTypes = {};

export default function Test(props) {
  useEffect(() => {
    async function f() {
      const resp = await axios.get("/api");
    }

    f();
  }, []);

  return <div> TESTING</div>;
}
