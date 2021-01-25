import Head from "next/head";
import Image from "next/image";
import PostCard from "../components/post-card";
import useSWR from "swr";
import { Post, Sub } from "../types";
import Link from "next/link";
import { useAuthState } from "../context/auth";

function PageIndex() {
  const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");
  const { authenticated } = useAuthState();

  return (
    <>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
      <div className="container flex pt-5">
        <div className="w-full px-4 md:w-160 md:p-0">
          {posts?.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
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
