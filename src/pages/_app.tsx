import { AppProps } from "next/app";
import axios from "axios";
import "../assets/styles/scss/globals.scss";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
