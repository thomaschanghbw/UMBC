import React from "react";

export default React.createContext({
  //user settings
  isCameraOff: null,
  isMicOff: null,
  isScreenOff: null,
  setCamera: null,
  setMic: null,
  setScreen: null,

  //callStates
  enableJoin: null,
  enableCall: null,
  enableLeave: null,
  enableCallButtons: null,

  //callActions
  joinCall: null,
  leaveCall: null,

  //callItems
  callItems: null,
});
