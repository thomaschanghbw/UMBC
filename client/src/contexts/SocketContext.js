import React from "react";

const SocketContext = React.createContext({
  socket: null,
  myChannel: null,
  updateSelf: null,
});

export default SocketContext;
