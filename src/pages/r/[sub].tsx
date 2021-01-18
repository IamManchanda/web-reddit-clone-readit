import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import PostCard from "../../components/post-card";
import { Sub } from "../../types";

function PageSub() {
  const router = useRouter();
  const { sub: subName } = router.query;
  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : "");

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
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <Fragment>
          <div>
            <div className="bg-blue-500">
              {sub.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <div className="h-20 bg-blue-500" />
              )}
            </div>
            <div className="h-20 bg-white">
              <div className="container relative flex">
                <div className="absolute" style={{ top: -15 }}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    title="Sub"
                    className="rounded-full"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex pt-5">
            <div className="w-160">{postsMarkup}</div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default PageSub;
