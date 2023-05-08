import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-center">
        <div>
          <h1 className="text-5xl md:text-7xl text-gray-900 font-extrabold mb-5">
            Main Title for the project
          </h1>
        </div>
        <div>
          <span className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            (some subtitle)
          </span>
        </div>
        <div className="max-w-3xl mx-auto mt-9">
          <p className="text-xl text-gray-400">paragraph1</p>
          <p className="text-xl text-gray-400">paragraph2</p>
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mt-12">
            <div className="w-full">
              {/* <Image
                src="/vesting.webp"
                width={1000}
                height={500}
                alt="vesting"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
