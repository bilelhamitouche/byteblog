import FeaturedPosts from "@/components/featured-posts";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import Topics from "@/components/Topics";
import WhyChooseByteblog from "@/components/why-choose-byteblog";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <WhyChooseByteblog />
      <Topics />
      <FeaturedPosts />
      <Newsletter />
      <Footer />
    </div>
  );
}
