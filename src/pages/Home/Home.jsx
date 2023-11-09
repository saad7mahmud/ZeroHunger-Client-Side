import CustomFoodReq from "../../ExtraSections/OurFeatures/CustomFoodReq/CustomFoodReq";
import OurFeatures from "../../ExtraSections/OurFeatures/OurFeatures";
import FeaturedFoods from "../../Featured/FeaturedFoods";
import ThemeSwitcher from "../../Theme/ThemeSwitcher";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <ThemeSwitcher></ThemeSwitcher>
      <Banner></Banner>

      <FeaturedFoods></FeaturedFoods>
      <OurFeatures></OurFeatures>
      <CustomFoodReq></CustomFoodReq>
    </div>
  );
};

export default Home;
