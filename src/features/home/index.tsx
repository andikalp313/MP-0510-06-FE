import Navgiation from "@/features/events/components/Navgiation";
import EventList from "../events";
import Jumbotron from "./components/Jumbotron";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div>
      <Jumbotron />
      <EventList />
      <Footer />
    </div>
  );
};

export default HomePage;
