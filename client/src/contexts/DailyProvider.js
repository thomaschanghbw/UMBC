import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import DailyIframe from "@daily-co/daily-js";
import PropTypes from "prop-types";

import SocketContext from "./SocketContext";
import DailyContext from "./DailyContext";
import useCallState, {
  ITEM_CHANGE,
  ITEM_DELETE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  RESET_STATE,
} from "./useCallState";
const debug = require("debug")("app:contexts:DailyProvider");

const STATE_IDLE = "STATE_IDLE";
const STATE_LOADING = "STATE_LOADING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";

DailyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function DailyProvider(props) {
  const { uid } = useContext(SocketContext);
  const [callObject, setCallObject] = useState(null);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMicOff, setIsMicOff] = useState(false);
  const [isScreenOff, setIsScreenOff] = useState(true);
  const [appState, setAppState] = useState(STATE_IDLE);
  const appStateR = useRef(null);

  const [callState, dispatchCallState] = useCallState();

  /*************
   * APP STATE UPDATES
   ************/
  //Only create one callObject at a time(destroy the prev one)
  //Don't call destory before getting "joined-meeting" event(disable leave button)
  const enableCall = [STATE_LOADING, STATE_JOINING, STATE_JOINED].includes(
    appState
  ); //legacy call will eventually show state
  const enableLeave = [STATE_IDLE, STATE_JOINING, STATE_JOINED].includes(
    appState
  ); //can Leave
  const enableCallButtons = [STATE_JOINED].includes(appState); //call actually exists
  const enableJoin = appState === STATE_IDLE;

  const joinCall = useCallback(
    (url) => {
      if (appStateR.current !== STATE_IDLE) {
        debug("Ignoring joinCall because not idle");
        return;
      }

      const newCallObject = DailyIframe.createCallObject({
        dailyConfig: {
          experimentalChromeVideoMuteLightOff: true,
        },
      });
      setCallObject(newCallObject);
      curCallObject = newCallObject;

      setAppState(STATE_LOADING);
      dispatchCallState({ type: RESET_STATE }); //need to clear errors inbetween call join attempts
      curCallObject
        .join({ url, userName: uid })
        .then((s) => debug("Joining call", s))
        .catch((err) => {
          console.error("Joining call", err);
        });
    },
    [callObject, dispatchCallState, uid]
  );

  const leaveCall = useCallback(() => {
    if (
      !callObject ||
      appStateR.current === STATE_IDLE ||
      appStateR.current === STATE_LEAVING
    ) {
      debug("Ignoring leaving call");
      return;
    }

    debug("Start Leaving Call");
    setAppState(STATE_LEAVING);
    callObject.leave().catch((err) => {
      console.error(err);
    });
  }, [callObject]);

  //Update app state based on dailys reports
  useEffect(() => {
    if (!callObject) return;

    const events = [
      "started-camera",
      "joined-meeting",
      "left-meeting",
      "error",
    ];

    function handleNewMeetingState(event) {
      if (event) {
        switch (event.action) {
          case "started-camera":
            setAppState(STATE_JOINING);
            break;
          case "joined-meeting":
            setAppState(STATE_JOINED);
            break;
          case "left-meeting":
            setAppState(STATE_IDLE);
            break;
          case "error":
            leaveCall();
            setAppState(STATE_IDLE);
            break;
          default:
            break;
        }
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject, leaveCall]);

  /*************
   * PARTICIPANT UPDATES
   ************/

  //Participant joins, updates, and leaves
  useEffect(() => {
    if (!callObject) return;

    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left",
    ];

    function handleNewParticipantsState(event) {
      if (event) {
        logDailyEvent(event);

        const participant = event.participant;
        if (participant.user_name) {
          debug("Update", event, participant);
          const id =
            participant.user_name === user.id ? "local" : participant.user_name;
          const callItem = {
            id,
            audioTrack: participant.audioTrack,
            videoTrack: participant.videoTrack,
          };

          if (event.action === "participant-left") {
            dispatchCallState({ type: ITEM_DELETE, callItem });
          } else {
            dispatchCallState({ type: ITEM_CHANGE, callItem });
          }
        } else {
          debug("Loading participant username", participant);
        }
      }
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject, dispatchCallState, user.id]);

  /*************
   * ERRORS
   ************/
  useEffect(() => {
    if (!callObject) return;

    function handleCameraErrorEvent(event) {
      const message =
        (event && event.errorMsg && event.errorMsg.errorMsg) || "Unknown";
      dispatchCallState({ type: CAM_OR_MIC_ERROR, message });
      console.error(`Daily camera-error: ${message}`);
    }

    // We're making an assumption here: there is no camera error when callObject
    // is first assigned.

    callObject.on("camera-error", handleCameraErrorEvent);

    return function cleanup() {
      callObject.off("camera-error", handleCameraErrorEvent);
    };
  }, [callObject, dispatchCallState]);

  //fatal errors
  useEffect(() => {
    if (!callObject) return;

    function handleErrorEvent(e) {
      const message = (e && e.errorMsg) || "Unknown";
      dispatchCallState({ type: FATAL_ERROR, message });
      //also leaves call and sets state to idle, above with the other appstate sets
    }

    // We're making an assumption here: there is no error when callObject is
    // first assigned.
    callObject.on("error", handleErrorEvent);

    return function cleanup() {
      callObject.off("error", handleErrorEvent);
    };
  }, [callObject, dispatchCallState]);

  /************
   * TRAY FUNCTIONS
   ************/
  function setCamera(v) {
    callObject.setLocalVideo(v);
  }

  function setMic(v) {
    callObject.setLocalAudio(v);
  }

  async function setScreen(v) {
    // "There's no way to know if the user ignores or cancels the browser's screen share confirmation dialog." - https://docs.daily.co/reference#%EF%B8%8F-startscreenshare
    v ? callObject.startScreenShare() : callObject.stopScreenShare();
  }

  //Listen for changes to local user state
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      let hasCam,
        hasMic = true;
      let hasScreen = false;
      if (
        callObject &&
        callObject.participants() &&
        callObject.participants().local
      ) {
        const localParticipant = callObject.participants().local;
        hasCam = localParticipant.video;
        hasMic = localParticipant.audio;
        hasScreen = localParticipant.screen;
      }

      setIsCameraOff(!hasCam);
      setIsMicOff(!hasMic);
      setIsScreenOff(!hasScreen);
    }

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on("participant-updated", handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  /*************
   * MISC
   ************/

  useEffect(() => {
    debug("CALL", appState);
    appStateR.current = appState;
  }, [appState]);

  return (
    <DailyContext.Provider
      value={{
        isCameraOff,
        isMicOff,
        isScreenOff,
        setCamera,
        setMic,
        setScreen,
        enableJoin,
        enableCall,
        enableLeave,
        enableCallButtons,
        joinCall,
        leaveCall,
        callItems: callState.callItems,
      }}
    >
      {props.children}
    </DailyContext.Provider>
  );
}
