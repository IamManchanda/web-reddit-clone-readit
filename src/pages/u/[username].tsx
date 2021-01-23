import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

function PageUsername() {
  const router = useRouter();
  const { username } = router.query;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);

  if (error) {
    router.push("/");
  }

  if (data) {
    console.log({ data });
  }

  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>

      {data && (
        <div className="container flex pt-5">
          <div className="w-160">
            <p>{data.user.username}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PageUsername;
