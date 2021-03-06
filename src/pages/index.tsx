import Head from "next/head";
import Image from "next/image";
import PostCard from "../components/post-card";
import useSWR, { useSWRInfinite } from "swr";
import { Post, Sub } from "../types";
import Link from "next/link";
import { useAuthState } from "../context/auth";
import { useState, useEffect } from "react";

function PageIndex() {
  const [observedPost, setObservedPost] = useState("");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const title = "Readit: The Front Page of the Internet";
  const description =
    "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!";

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`, {
    revalidateAll: true,
  });

  const posts: Post[] = data ? [].concat(...data) : [];
  const isInitialLoading = !data && !error;

  useEffect(() => {
    if (!posts || posts.length === 0) {
      return;
    }

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      {
        threshold: 1,
      },
    );
    observer.observe(element);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <div className="container flex pt-5">
        <div className="w-full px-4 md:w-160 md:p-0">
          {isInitialLoading && (
            <p className="text-lg text-center">Loading...</p>
          )}
          {posts?.map((post) => (
            <PostCard
              key={post.identifier}
              post={post}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More...</p>
          )}
        </div>
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a className="flex items-center">
                      <Image
                        src={sub.imageUrl}
                        alt="Sub"
                        className="rounded-full cursor-pointer"
                        width={24}
                        height={24}
                      />
                      <span className="ml-2 font-bold hover:cursor-pointer hover:underline">
                        /r/{sub.name}
                      </span>
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PageIndex;
