import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "../src/components/Button";

const debug = require("debug")("app:Home");

Home.propTypes = {};

export default function Home(props) {
  const [x, setX] = useState(6);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-row justify-between px-8 py-4 bg-black text-white">
        <div className="flex flex-row items-center">
          <img
            className="h-10 w-10 rounded-full mr-2"
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg"
          />
          <div>Navbar</div>
        </div>
        <Button hi={false}>Request Invite</Button>
      </div>
      <div className="flex-1 flex-row py-8 px-8 bg-blue-500 border border-orange-600">
        <div
          className="bg-red-200 hover:text-gray-600"
          onClick={() => setX(x + 1)}
        >
          Heel {x}
        </div>
        <div>Yo</div>
      </div>
    </div>
  );
}
