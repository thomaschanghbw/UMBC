import "../styles/globals.css";
import "../styles/tailwind.css";

import SocketProvider from "../src/contexts/SocketProvider";
import DailyProvider from "src/contexts/DailyProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <DailyProvider>
        <Component {...pageProps} />
      </DailyProvider>
    </SocketProvider>
  );
}

export default MyApp;
