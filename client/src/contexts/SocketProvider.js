import React, { useState, useEffect, useContext, useCallback } from "react";
import { Socket, Presence } from "phoenix";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

import SocketContext from "./SocketContext";
const debug = require("debug")("app:SocketProvider");

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SocketProvider(props) {
  const [socket, setSocket] = useState(null);
  const [myChannel, setMyChannel] = useState(null);

  useEffect(() => {
    const newSocket = new Socket("/socket", { params: { user_id: nanoid(6) } });
    setSocket(newSocket);
    newSocket.connect();
    debug("Connect to Socket");
    const newMyChannel = newSocket.channel(`meet:lobby`, {});
    newMyChannel
      .join()
      .receive("ok", () => {
        debug("Joined MyChannel");
        setMyChannel(newMyChannel);
      })
      .receive("error", ({ reason }) =>
        dispatch(logChannelJoinError("MyChannel", new Error(reason)))
      )
      .receive("timeout", () =>
        dispatch(logChannelJoinError("MyChannel", new Error("TIMEOUT")))
      );

    return () => {
      newSocket.disconnect(() => debug("Disconnect from old socket"));
      newMyChannel.leave().receive("ok", () => debug("Left MyChannel"));
    };
  }, []); //any updateUser with same user doesn't update this

  // if (!socket) {
  //   return <Loading />;
  // } else {
  return (
    <SocketContext.Provider
      value={{
        socket,
        myChannel,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
  // }
}
