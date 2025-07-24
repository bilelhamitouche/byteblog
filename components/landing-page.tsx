import FeaturedPosts from "./featured-posts";
import Footer from "./footer";
import Hero from "./hero";
import Newsletter from "./newsletter";
import Topics from "./Topics";
import WhyChooseByteblog from "./why-choose-byteblog";

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
