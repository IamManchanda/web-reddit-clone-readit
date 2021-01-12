import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types";

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
                  <p>{post.body}</p>
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
