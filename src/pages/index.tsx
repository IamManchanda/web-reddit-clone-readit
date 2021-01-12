import Head from "next/head";
import styles from "../assets/styles/scss/Home.module.scss";
import { Fragment } from "react";
import RedditLogo from "../assets/images/reddit.svg";
import Link from "next/link";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
      <div className={styles.container}>
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
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
        </div>
      </div>
    </Fragment>
  );
}
