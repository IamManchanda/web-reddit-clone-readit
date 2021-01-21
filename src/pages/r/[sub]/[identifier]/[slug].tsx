import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";
import useSWR from "swr";
import Sidebar from "../../../../components/sidebar";
import { Post } from "../../../../types";
import { useAuthState } from "../../../../context/auth";

dayjs.extend(relativeTime);

function PageSubIdentifierSlug() {
  const { authenticated } = useAuthState();
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
  );

  const vote = async (value: number) => {
    if (!authenticated) {
      router.push("/login");
    }

    if (value === post.userVote) {
      value = 0;
    }

    try {
      const res = await axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });
      console.log(res.data);
    } catch (error) {
      console.log({ error });
    }
  };

  if (error) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Link href={`/r/${sub}`}>
        <a>
          <div className="flex items-center w-full h-20 p-8 bg-blue-500">
            <div className="container flex">
              {post && (
                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                  <Image src={post.sub.imageUrl} width={32} height={32} />
                </div>
              )}
              <p className="text-xl font-semibold text-white hover:underline">
                /r/{sub}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="container flex pt-5">
        <div className="w-160">
          <div className="bg-white rounded">
            {post && (
              <div className="flex">
                <div className="w-10 py-3 text-center rounded-l">
                  <div
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                    onClick={() => vote(1)}
                  >
                    <i
                      className={classNames("icon-arrow-up", {
                        "text-red-500": post.userVote === 1,
                      })}
                    />
                  </div>
                  <p className="text-xs font-bold">{post.voteScore}</p>
                  <div
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                    onClick={() => vote(-1)}
                  >
                    <i
                      className={classNames("icon-arrow-down", {
                        "text-blue-600": post.userVote === -1,
                      })}
                    />
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500">
                      Posted by
                      <Link href={`/u/${post.username}`}>
                        <a className="mx-1 hover:underline">
                          /u/{post.username}
                        </a>
                      </Link>
                      <span>•</span>
                      <Link href={post.url}>
                        <a className="mx-1 hover:underline">
                          {dayjs(post.createdAt).fromNow()}
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {post && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
}

export default PageSubIdentifierSlug;
