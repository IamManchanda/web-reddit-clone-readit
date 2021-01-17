import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types";
import PostCard from "../components/post-card";
import useSWR from "swr";

function PageIndex() {
  const { data: posts } = useSWR("/posts");

  return (
    <Fragment>
      <Head>
        <title>Readit: The Front Page of the Internet</title>
      </Head>
      <div className="container flex pt-5">
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PageIndex;
