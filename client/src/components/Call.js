import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import SocketContext from "src/contexts/SocketContext";
import DailyContext from "src/contexts/DailyContext";
import Icebreakers from "./Icebreakers";
const debug = require("debug")("app:Call");

Call.propTypes = {};

export default function Call(props) {
  const { callItems, joinCall } = useContext(DailyContext);
  const { room, presence, updateSelf, uid } = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    if (room) {
      joinCall(room.url);
    } else {
      alert("NO ROOM");
      // router.push("/home");
    }
    updateSelf({ status: "room" });
  }, []);

  useEffect(() => {
    debug("CALLITEMS", callItems);
  }, [callItems]);

  useEffect(() => {}, [presence]);

  const uidToNameMap = useMemo(() => {
    let nameMap = {};
    for (let p of presence) {
      for (let m of p.metas) {
        nameMap[m.id] = m.name;
      }
    }
    debug("NAMEMAP", nameMap);
    return nameMap;
  }, [presence]);

  const items = Object.entries(callItems).map(([id, callItem]) => {
    return {
      id,
      ...callItem,
      name: id === uid ? uidToNameMap[uid] : uidToNameMap[id],
    };
  });
  const item1 = items.length >= 1 ? items[0] : {};
  const item2 = items.length >= 2 ? items[1] : {};
  const item3 = items.length >= 3 ? items[2] : {};
  const item4 = items.length >= 4 ? items[3] : {};

  return (
    <div className="flex flex-1 flex-row justify-center align-middle bg-blue-300 h-3/5 w-full">
      {/* left third */}
      <div className="flex flex-col mr-20 items-center my-6">
        <Video {...item1} />
        <Video {...item2} />
      </div>

      {/* centre third */}
      <Icebreakers />

      {/* right third */}
      <div className="flex ml-20 flex-col items-center my-6">
        <Video {...item3} />
        <Video {...item4} />
      </div>
    </div>
  );
}

function Video(props) {
  debug("VIDEO", props, props.id);
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  useEffect(() => {
    if (props.videoTrack) {
      const newStream = new MediaStream([props.videoTrack]);
      videoEl.current && (videoEl.current.srcObject = newStream);
    }
  }, [props.videoTrack]);

  useEffect(() => {
    if (props.audioTrack) {
      const newStream = new MediaStream([props.audioTrack]);
      audioEl.current && (audioEl.current.srcObject = newStream);
    }
  }, [props.audioTrack]);

  return (
    <>
      <video
        className="object-cover h-64 w-64 rounded-full"
        muted
        autoPlay
        playsInline
        data-setup="{}"
        ref={videoEl}
        draggable={false}
        poster={
          "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
        }
      />
      {props.id !== "local" && <audio autoPlay playsInline ref={audioEl} />}
      <div className="mb-6 self-center">{props.name}</div>
    </>
  );
}
