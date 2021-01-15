import axios from "axios";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Fragment } from "react";
import "../assets/styles/scss/icons.scss";
import "../assets/styles/scss/tailwind.scss";
import Navbar from "../components/navbar";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const isAuthRoute = authRoutes.includes(pathname);
  return (
    <Fragment>
      {!isAuthRoute && <Navbar />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
