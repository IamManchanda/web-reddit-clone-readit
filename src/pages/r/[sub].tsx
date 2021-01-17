import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/post-card";

function PageSubreddit() {
  const router = useRouter();
  const { sub: subName } = router.query;
  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : "");

  if (error) {
    router.push("/");
  }

  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center">No posts submitted yet...</p>
    );
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <Fragment>
      <Head>
        <title>Subreddit: {subName}</title>
      </Head>
      <div className="container flex pt-5">
        {sub && <div className="w-160">{postsMarkup}</div>}
      </div>
    </Fragment>
  );
}

export default PageSubreddit;
