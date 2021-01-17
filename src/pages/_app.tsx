import axios from "axios";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import "../assets/styles/scss/icons.scss";
import "../assets/styles/scss/tailwind.scss";
import Navbar from "../components/navbar";
import { AuthProvider } from "../context/auth";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const isAuthRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!isAuthRoute && <Navbar />}
        <div className={isAuthRoute ? "" : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
