import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedFoods = () => {
  const [availableFood, setAvailableFood] = useState([]);
  const slicedAvailableFoods = availableFood.slice(0, 6);
  console.log(slicedAvailableFoods);

  const url = "http://localhost:5000/available-foods-feature";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAvailableFood(data);
      });
  }, [url]);

  return (
    <div>
      <h1 className="text-center text-4xl py-2 font-bold">Featured Foods</h1>
      <p className="text-center text-xl font-normal">
        Delicious Highlights from Our Community
      </p>
      <hr
        className="mx-auto m-5"
        width="50%"
        color="green"
        size="2"
        align="center"
      />

      <div className="grid gap-4 m-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {slicedAvailableFoods.map((slicedAvailableFood) => (
          <div className="" key={slicedAvailableFood._id}>
            <div className="">
              <div className="card  bg-base shadow-2xl ">
                <figure className="px-10 pt-10">
                  <img
                    src={slicedAvailableFood.foodImage}
                    alt="Shoes"
                    className="rounded-xl "
                  />
                </figure>
                <div className="card-body  ">
                  <p className="text-2xl font-bold">
                    {slicedAvailableFood.foodName}
                  </p>
                  <p>
                    <span className="font-bold">Food ID: </span>
                    {`${slicedAvailableFood._id}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-7 rounded-full"
                      src={slicedAvailableFood.donatorImage}
                      alt=""
                    />
                    <p>
                      <span className="font-bold">Donator Name: </span>
                      {` ${slicedAvailableFood.donatorName}`}
                    </p>
                  </div>
                  <p>
                    <span className="font-bold">Food Quantity: </span>
                    {`${slicedAvailableFood.foodQuantityNumber} Person`}
                  </p>
                  <p>
                    <span className="font-bold">Pickup Location: </span>
                    {` ${slicedAvailableFood.foodPickUpLocation}`}
                  </p>
                  <p>
                    <span className="font-bold">Expiry Date: </span>
                    {` ${slicedAvailableFood.foodExpiryDate}`}
                  </p>
                  <p>
                    <span className="font-bold">Additional Notes: </span>
                    {`${slicedAvailableFood.additionalDonatorNotes}`}
                  </p>
                  <p>
                    <span className="font-bold">Donator Mail: </span>
                    {`${slicedAvailableFood.donatorEmail}`}
                  </p>

                  <div className="card-actions ">
                    <Link to={`/available-foods/${slicedAvailableFood._id}`}>
                      <div>
                        <button className="w-full mt-10 mb-3 btn btn-primary">
                          View Details
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link to="/available-foods">
          <button className=" mx-auto flex mt-10 mb-3 btn btn-primary">
            View All Available Foods
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
