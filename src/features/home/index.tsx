import Navgiation from "@/features/events/components/Navgiation";
import EventList from "../events";
import Jumbotron from "./components/Jumbotron";
import Footer from "@/components/Footer";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HeroParallaxDemo } from "./components/HeroParralax";

const HomePage = () => {
  return (
    <div>
      <Jumbotron />
      <div className="bg-[#f0f9ff]">
        <HeroParallaxDemo />
      </div>
      <EventList />
      <Footer />
    </div>
  );
};

export default HomePage;
