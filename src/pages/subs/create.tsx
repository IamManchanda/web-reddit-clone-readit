import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

function CreateSubs() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Partial<any>>({});

  return (
    <>
      <Head>
        <title>Create a Community</title>
      </Head>

      <div className="flex bg-white">
        <div
          className="h-screen bg-center bg-cover w-36"
          style={{
            backgroundImage: "url('/images/bricks.jpg')",
          }}
        />
        <div className="flex flex-col justify-center pl-6">
          <div className="w-98">
            <h1 className="mb-2 text-lg font-medium">Create a Community</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { cookie } = req.headers;

    if (!cookie) {
      throw new Error("Missing auth token cookie");
    }

    await axios.get("/auth/me", {
      headers: { cookie },
    });

    return {
      props: {},
    };
  } catch (error) {
    res
      .writeHead(307, {
        Location: "/login",
      })
      .end();
  }
};

export default CreateSubs;
