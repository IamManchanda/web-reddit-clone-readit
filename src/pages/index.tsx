import Head from "next/head";
import Image from "next/image";
import PostCard from "../components/post-card";
import useSWR from "swr";
import { Post, Sub } from "../types";
import Link from "next/link";

function PageIndex() {
  const { data: posts } = useSWR("/posts");
  const { data: topSubs } = useSWR("/misc/top-subs");

  return (
    <>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
      <div className="container flex pt-5">
        <div className="w-160">
          {posts?.map((post: Post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
        <div className="ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a className="flex items-center">
                      <div className="w-6 h-6 mr-2 overflow-hidden rounded-full cursor-pointer">
                        <Image
                          src={sub.imageUrl}
                          alt="Sub"
                          width={24}
                          height={24}
                        />
                      </div>
                      <span className="font-bold hover:cursor-pointer hover:underline">
                        /r/{sub.name}
                      </span>
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">{sub.postCount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageIndex;
