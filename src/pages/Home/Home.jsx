import OurFeatures from "../../ExtraSections/OurFeatures/OurFeatures";
import FeaturedFoods from "../../Featured/FeaturedFoods";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
      <OurFeatures></OurFeatures>
    </div>
  );
};

export default Home;
