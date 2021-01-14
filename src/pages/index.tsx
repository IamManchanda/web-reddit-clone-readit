import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../types";

dayjs.extend(relativeTime);

function PageIndex() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async function readPosts() {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
      <div className="pt-12">
        <div className="container flex pt-4">
          <div className="w-160">
            {posts.map((post) => (
              <div key={post.identifier} className="flex mb-4 bg-white rounded">
                <div className="w-10 text-center bg-gray-200 rounded-l">
                  <p>V</p>
                </div>
                <div className="w-full p-2">
                  <div className="flex items-center">
                    <Link href={`/r/${post.subName}`}>
                      <a className="flex items-center">
                        <img
                          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                          className="w-6 h-6 mr-1 rounded-full"
                        />
                        <span className="text-xs font-bold hover:underline">
                          /r/{post.subName}
                        </span>
                      </a>
                    </Link>
                    <p className="text-xs text-gray-500">
                      <span className="mx-1">•</span>
                      Posted by
                      <Link href={`/u/user`}>
                        <a className="mx-1 hover:underline">/u/user</a>
                      </Link>
                      <span>•</span>
                      <Link
                        href={`/r/${post.subName}/${post.identifier}/${post.slug}`}
                      >
                        <a className="mx-1 hover:underline">
                          {dayjs(post.createdAt).fromNow()}
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PageIndex;
