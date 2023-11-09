import { Helmet } from "react-helmet";
import CustomFoodReq from "../../ExtraSections/OurFeatures/CustomFoodReq/CustomFoodReq";
import OurFeatures from "../../ExtraSections/OurFeatures/OurFeatures";
import FeaturedFoods from "../../Featured/FeaturedFoods";

import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ZeroHunger</title>
      </Helmet>

      <Banner></Banner>

      <FeaturedFoods></FeaturedFoods>
      <OurFeatures></OurFeatures>
      <CustomFoodReq></CustomFoodReq>
    </div>
  );
};

export default Home;
