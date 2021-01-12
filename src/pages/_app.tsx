import { AppProps } from "next/app";
import axios from "axios";
import "../assets/styles/scss/tailwind.scss";
import { Fragment } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";

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
