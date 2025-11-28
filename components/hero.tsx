import Link from "next/link";
import { Button } from "./ui/button";
import { lusitana } from "@/lib/fonts";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse gap-16 items-stretch py-12 px-8 sm:py-16 md:py-20 lg:flex-row">
      <div className="flex flex-col gap-8 justify-center items-start">
        <h2 className={`${lusitana.className} text-4xl md:text-5xl text-bold`}>
          Your Voice, Amplified
        </h2>
        <p className="max-w-xl text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-400">
          Join ByteBlog, where thoughtful writers and curious readers come
          together to share ideas, stories, and insights that matter.
        </p>
        <div className="flex gap-4 items-center">
          <Button size="lg" className="text-base">
            <Link href="/register">Start Writing</Link>
          </Button>
          <Button variant="outline" size="lg" className="text-base">
            <Link href="/posts">Explore Posts</Link>
          </Button>
        </div>
      </div>
      <Image
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hero image"
        width="600"
        height="400"
        className="rounded-lg drop-shadow-xl"
      />
    </section>
  );
}
