import Head from "next/head";
import { Fragment } from "react";
import RedditLogo from "../assets/images/reddit.svg";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
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
        <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
          <input
            type="text"
            placeholder="Search..."
            className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
          />
        </div>
        <div className="flex">
          <Link href="/login">
            <a className="w-32 py-1 mr-4 leading-5 button blue hollow">
              Log In
            </a>
          </Link>
          <Link href="/register">
            <a className="w-32 py-1 leading-5 button blue">Sign Up</a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
