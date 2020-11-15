import { useReducer } from "react";
const debug = require("debug")("app:contexts:useCallState");

export default useCallState;

export { ITEM_CHANGE, ITEM_DELETE, CAM_OR_MIC_ERROR, FATAL_ERROR, RESET_STATE };

/**
 * Call state is comprised of:
 * - "Call items" (inputs to the call, i.e. participants or shared screens)
 * - Errors
 * Call items are keyed by id:
 * - "local" for the current participant
 * - A session id for each remote participant
 * - "<id>-screen" for each shared screen
 */
const initialCallState = {
  callItems: {},
  camOrMicError: null,
  fatalError: null,
};

//don't forget to add any new action to index.js of CallContext
// --- Actions ---
const ITEM_CHANGE = "ITEM_CHANGE";
//- callItem: id, audioTrack, videoTrack

const ITEM_DELETE = "ITEM_DELETE";
//- callItem: id

const CAM_OR_MIC_ERROR = "CAM_OR_MIC_ERROR";
//- message: string

const FATAL_ERROR = "FATAL_ERROR";
//- message: string

const RESET_STATE = "RESET_STATE";

export function useCallState() {
  const [callState, dispatch] = useReducer(callReducer, initialCallState);
  return [callState, dispatch];
}

// --- Reducer and helpers --
function callReducer(callState, action) {
  switch (action.type) {
    case ITEM_CHANGE: {
      //need {} to keep lexical declaration only in block
      const callItem = action.callItem;
      return updateCallItem(callState, callItem);
    }
    case ITEM_DELETE: {
      const callItemId = action.callItem.id;
      return removeCallItem(callState, callItemId);
    }
    case CAM_OR_MIC_ERROR:
      return { ...callState, camOrMicError: action.message };
    case FATAL_ERROR:
      return { ...callState, fatalError: action.message };
    case RESET_STATE: //only clears errors
      debug("RESET STATE");
      return initialCallState;
    default:
      throw new Error(`Unknown callState action type ${action && action.type}`);
  }
}

function updateCallItem(callState, callItem) {
  const newCallItems = { ...callState.callItems };

  newCallItems[callItem.id] = {
    ...newCallItems[callItem.id],
    ...callItem,
  };

  return { ...callState, callItems: newCallItems };
}

function removeCallItem(callState, callItemId) {
  const newCallItems = { ...callState.callItems };
  if (!newCallItems[callItemId]) {
    debug("Deleted nonexisting id", callItemId);
    return callState;
  }

  debug("DELETE CALLITEMID", callItemId);
  delete newCallItems[callItemId];
  return { ...callState, callItems: newCallItems };
}
