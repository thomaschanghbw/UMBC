import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { Video, Camera, CameraOff } from "react-feather";
import { VideoOff } from "react-feather";
import { Mic } from "react-feather";
import { MicOff } from "react-feather";

const debug = require("debug")("app:Home");

Home.propTypes = {};

export default function Home(props) {
  const [mic, setMic] = useState(false);
  const [vid, setVid] = useState(false);
  return (
    // master div //
    <div className="h-screen w-screen">
      {/* header/prompt/body/tray master div */}
      <div className="flex flex-col h-full w-full">
        {/* header  */}
        <div className="flex flex-col items-center w-full font-extrabold h-1/5 bg-red-400">
          <div className="pt-4 pb-2 px-8 text-4xl text-white">
            Dinner For 12 Strangers
          </div>
          <div className="pb-4 text-gray-200">
            Come and eat with other people
          </div>
        </div>

        {/* prompt */}
        <div className="flex w-full justify-center bg-blue-300">
          <div className="my-5 w-1/5 py-3 text-center bg-white text-lg rounded-lg">
            "Everybody here likes _______."
          </div>
        </div>

        {/* body */}
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

        {/* tray */}
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
            <div className="bg-red-600 py-3 px-3 rounded-lg">
              Leave the call
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
