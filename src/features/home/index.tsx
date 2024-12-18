import Navgiation from "@/features/events/components/Navgiation";
import EventList from "../events";
import Jumbotron from "./components/Jumbotron";

const HomePage = () => {
  return (
    <div>
      <Jumbotron />

      <EventList />
    </div>
  );
};

export default HomePage;
