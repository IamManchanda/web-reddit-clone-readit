import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function PageSubreddit() {
  const router = useRouter();
  const { sub: subName } = router.query;

  return (
    <Fragment>
      <Head>
        <title>Subreddit: {subName}</title>
      </Head>
      <h1 className="text-5xl">{subName}</h1>
    </Fragment>
  );
}

export default PageSubreddit;
