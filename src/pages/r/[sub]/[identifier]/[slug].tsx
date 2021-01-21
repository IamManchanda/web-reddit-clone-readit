import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

function PageSubIdentifierSlug() {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { data: post, error } = useSWR(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
  );

  if (error) {
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>{post?.title}</title>
      </Head>
    </Fragment>
  );
}

export default PageSubIdentifierSlug;
