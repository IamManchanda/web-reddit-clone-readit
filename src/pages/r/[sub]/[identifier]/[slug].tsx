import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../../types";

function PageSubIdentifierSlug() {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
  );

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
    </>
  );
}

export default PageSubIdentifierSlug;
