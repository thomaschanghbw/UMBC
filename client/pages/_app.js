import "../styles/globals.css";
import "../styles/tailwind.css";

import SocketProvider from "../src/contexts/SocketProvider";

function MyApp({ Component, pageProps }) {
  return (
    // <SocketProvider>
    <Component {...pageProps} />
    // </SocketProvider>
  );
}

export default MyApp;
