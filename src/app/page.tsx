import Jumbotron from "@/features/jumbotron/components/Jumbotron";
import NavbarComponent from "./../components/Navbar";
import Navgiation from "@/features/eventlist/components/Navgiation";

const page = () => {
  return (
    <div>
      <NavbarComponent />
      <Jumbotron />
      <Navgiation />
    </div>
  );
};

export default page;
