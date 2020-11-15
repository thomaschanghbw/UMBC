import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Camera, CameraOff, Mic, MicOff } from "react-feather";
const debug = require("debug")("app:Tray");

export default function Tray(props) {
  const [mic, setMic] = useState(false);
  const [vid, setVid] = useState(false);

  return (
    <div className="flex flex-row h-24 w-full self-end items-center  bg-blue-700">
      {/* empty third */}
      <div className="w-1/3 h-full"></div>
      {/* call icons */}
      <div className="flex flex-row items-center justify-center w-1/3 h-full">
        {/* microphone */}
        <div className="flex flex-col h-16 w-16 mx-4 items-center justify-center px-6 bg-gray-900 rounded-full">
          {/* <div>
      <img
        className="h-8 rounded-full"
        src="https://img.pngio.com/mic-mic-microphone-icon-png-and-vector-for-free-download-pngtree-mic-icon-png-512_512.png"
      />
    </div> */}
          <div onClick={() => setMic(!mic)}>
            {mic ? (
              <Mic size={36} color="white" />
            ) : (
              <MicOff size={36} color="white" />
            )}
          </div>
        </div>

        {/* video */}
        <div className="flex flex-col h-16 w-16 mx-4 items-center justify-center px-6 bg-gray-900 rounded-full">
          {/* <div>
      <img
        className="h-8 rounded-full"
        src="https://static.thenounproject.com/png/2584221-200.png"
      />
    </div> */}
          <div onClick={() => setVid(!vid)}>
            {vid ? (
              <Camera size={36} color="white" />
            ) : (
              <CameraOff size={36} color="white" />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-1/3 h-full justify-center items-center">
        <div className="bg-red-600 py-3 px-3 rounded-lg">Leave the call</div>
      </div>
    </div>
  );
}
