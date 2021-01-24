import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import RedditLogo from "../assets/images/reddit.svg";
import { useAuthState, useAuthDispatch } from "../context/auth";
import { Sub } from "../types";

const Navbar: React.FC = () => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch("LOGOUT");
      window.location.reload();
    } catch (error) {
      console.log({ error });
    }
  };

  const searchSubs = async (subName: string) => {
    setName(subName);

    try {
      const { data } = await axios.get(`/subs/search/${subName}`);
      setSubs(data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">
            <a>readit</a>
          </Link>
        </span>
      </div>
      <div className="relative flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
        <i className="pl-4 pr-3 text-gray-500 fas fa-search" />
        <input
          type="text"
          placeholder="Search..."
          className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
          value={name}
          onChange={(event) => searchSubs(event.target.value)}
        />
        <div
          className="absolute left-0 right-0 bg-white"
          style={{
            top: "100%",
          }}
        >
          {subs?.map((sub, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
            >
              <Image
                src={sub.imageUrl}
                className="rounded-full"
                alt="Sub"
                title="Sub"
                width={32}
                height={32}
              />
              <div className="ml-4 text-sm">
                <p className="font-medium">{sub.name}</p>
                <p className="text-gray-600">{sub.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        {!loading &&
          (authenticated ? (
            <button
              className="w-32 py-1 mr-4 leading-5 button blue hollow"
              onClick={logout}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link href="/login">
                <a className="w-32 py-1 mr-4 leading-5 button blue hollow">
                  Log In
                </a>
              </Link>
              <Link href="/register">
                <a className="w-32 py-1 leading-5 button blue">Sign Up</a>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
