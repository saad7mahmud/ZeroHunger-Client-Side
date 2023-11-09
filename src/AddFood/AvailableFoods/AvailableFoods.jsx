import { useLoaderData } from "react-router-dom";
import AvailableFoodsCard from "./AvailableFoodsCard";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useEffect } from "react";

const AvailableFoods = () => {
  // const availableFoods = useLoaderData();
  const [availableFoods, setAvailableFoods] = useState([]);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/available-foods?sort=${asc ? "asc" : "desc"}`)
      .then((res) => res.json())
      .then((data) => setAvailableFoods(data));
  }, [asc]);

  console.log(availableFoods);
  return (
    <div>
      <Helmet>
        <title>ZeroHunger | Available Foods</title>
      </Helmet>

      <button
        onClick={() => setAsc(!asc)}
        className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Click to sort by: {asc ? "Later Expiry Date" : "Near Expiry Date"}
      </button>
      <p className="text-center">
        Sorted by: {asc ? "Near Expiry Date" : "Later Expiry Date"}
      </p>
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
