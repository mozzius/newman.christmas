/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/button";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>newman.christmas</title>
        <meta name="description" content="merry christmas!!!" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            newman.<span className="text-green-700">christmas</span>
          </h1>
          <img
            src="https://i.tincy.pics/clb2g794300002e662q89fnhi"
            alt="buddy the elf"
            className="w-128 h-auto max-w-full"
          />
          <a href="https://52books.newman.christmas">
            <Button>52books</Button>
          </a>
          {/* <Link href="/empires">
            <Button>Play Empires</Button>
          </Link> */}
        </div>
      </main>
    </>
  );
};

export default Home;
