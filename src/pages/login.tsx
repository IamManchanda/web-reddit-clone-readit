import Head from "next/head";
import { Fragment } from "react";

export default function Login() {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <main>
          <h1>Login</h1>
        </main>
      </div>
    </Fragment>
  );
}
