import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MicButton from "src/components/Buttons/MicButton";
import CamButton from "src/components/Buttons/CamButton";
import LeaveButton from "src/components/Buttons/LeaveButton";
const debug = require("debug")("app:Icebreakers");

Icebreakers.propTypes = {};

let questionList = [
  "What's your favourite thing to do in your hometown?",
  "Are you a dog or a cat person?",
  "How many countries have you been to?",
  "What's your favourite seat on an airplane?",
  "What's something you're great at cooking?",
  "Do you have any hidden talents?",
  "If you could time travel, when would you go?",
  "What's the last show you binged on Netflix?",
  "What's your most treasured material possession?",
  "Who was your favourite teacher in school?",
  "What's a skill that everyone should learn?",
  "Who was your childhood celebrity crush?",
  "How many languages can you speak?",
  "Are you a listener or a talker?",
  "What was the most trouble you've ever gotten into?",
];

function generator() {
  let currQns =
    questionList[Math.round(Math.random() * (questionList.length - 1))];
  return currQns;
}

export default function Icebreakers(props) {
  const [qns, setQns] = useState(generator());
  function newQns() {
    setQns(generator());
  }
  return (
    <div className="flex items-center justify-around flex-col">
      <div className="w-4 h-16" />

      {/* table */}
      <div>
        <div className="flex h-64 w-64 rounded-full bg-yellow-600 items-center justify-center">
          <div className="flex text-lg py-3 px-3 text-center rounded-lg bg-white">
            {qns}
          </div>
        </div>
        {/* generate new qns button */}
        <div
          className="my-5 py-4 px-3 self-center text-lg rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer text-center"
          onClick={newQns}
        >
          Generate New Question
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex">
          <MicButton />
          <CamButton />
        </div>
        <LeaveButton />
      </div>
    </div>
  );
}
