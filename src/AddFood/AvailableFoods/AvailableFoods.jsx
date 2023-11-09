import { useLoaderData } from "react-router-dom";
import AvailableFoodsCard from "./AvailableFoodsCard";
import { Helmet } from "react-helmet";

const AvailableFoods = () => {
  const availableFoods = useLoaderData();

  console.log(availableFoods);
  return (
    <div>
      <Helmet>
        <title>ZeroHunger | Available Foods</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-5">
        {availableFoods.map((availableFood) => (
          <AvailableFoodsCard
            key={availableFood._id}
            availableFood={availableFood}
          ></AvailableFoodsCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
