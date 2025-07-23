import { lusitana } from "@/lib/fonts";
import Feature from "./feature";
import { BookOpen, MonitorSmartphone, Users } from "lucide-react";

export default function WhyChooseByteblog() {
  return (
    <section className="flex flex-col gap-8 items-center py-12 px-8 sm:py-12 md:py-16 lg:py-20">
      <h2 className={`${lusitana.className} text-3xl font-bold`}>
        Why Choose ByteBlog?
      </h2>
      <p className="max-w-2xl text-base text-center text-gray-600 sm:text-lg md:text-xl dark:text-gray-400">
        We've built the perfect platform for writers and readers who value
        quality content and meaningful conversations.
      </p>
      <div className="grid grid-cols-1 gap-16 p-8 text-center md:grid-cols-3">
        <Feature
          icon={<BookOpen size="25" />}
          feature="Rich Editor"
          description="Create beautiful stories with our intuitive writing tools and formatting options."
        />
        <Feature
          icon={<Users size="25" />}
          feature="Engaged Community"
          description="Connect with like-minded readers and writers who appreciate quality content."
        />
        <Feature
          icon={<MonitorSmartphone size="25" />}
          feature="Mobile Responsive"
          description="Your blog looks great on any device, right out of the box. No need to worry about responsiveness or mobile design."
        />
      </div>
    </section>
  );
}
