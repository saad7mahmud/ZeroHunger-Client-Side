import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const updateThisFood = useLoaderData();
  const { user } = useContext(AuthContext);
  console.log(updateThisFood);
  const {
    _id,
    foodName,
    foodImage,
    foodQuantityNumber,
    foodExpiryDate,
    expiryDateMs,
    foodPickUpLocation,
    foodStatus,
    additionalDonatorNotes,
    donatorName,
    donatorEmail,
    donatorImage,
  } = updateThisFood;

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("clicked");
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantity = form.foodQuantity.value;
    const foodQuantityNumber = parseInt(foodQuantity);
    const foodExpiryDate = form.foodExpiryDate.value;
    const expiryDateMs = new Date(foodExpiryDate).getTime();
    const foodPickUpLocation = form.foodPickUpLocation.value;
    const foodStatus = form.foodStatus.value;
    const additionalDonatorNotes = form.additionalDonatorNotes.value;

    const updateFoodInfo = {
      foodName,
      foodImage,
      foodQuantityNumber,
      foodExpiryDate,
      expiryDateMs,
      foodPickUpLocation,
      foodStatus,
      additionalDonatorNotes,
      donatorName,
      donatorEmail,
      donatorImage,
    };
    console.log("update", _id, updateFoodInfo);

    //   send this data to update
    fetch(`http://localhost:5000/available-foods-update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateFoodInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Food Successfully Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <div className="flex justify-center m-20">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 mt-4 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#32a374] to-[#57b38d] bg-clip-border text-white shadow-lg shadow-green-500/40">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Update Food
            </h3>
          </div>

          <div>
            <form onSubmit={handleUpdate}>
              <input
                className=" text-center peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="email"
                name="email"
                required
                disabled
                placeholder={
                  user?.displayName
                    ? `Donator Name: ${user.displayName}`
                    : `Donator Name: Not logged In`
                }
              />
              <input
                className="text-center peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="email"
                name="email"
                required
                disabled
                placeholder={
                  user?.email
                    ? `Donator Email: ${user.email}`
                    : `Donator Email: Not logged In`
                }
              />
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="text"
                name="foodName"
                required
                placeholder="Food Name"
                defaultValue={foodName}
              />
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="text"
                name="foodImage"
                required
                placeholder="Food Image URL"
                defaultValue={foodImage}
              />
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="number"
                name="foodQuantity"
                required
                placeholder="Food Quantity"
                defaultValue={foodQuantityNumber}
              />
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="date"
                name="foodExpiryDate"
                required
                placeholder="Food Expiry Date"
                defaultValue={foodExpiryDate}
              />
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="text"
                name="foodPickUpLocation"
                required
                placeholder="Food Pickup Location"
                defaultValue={foodPickUpLocation}
              />

              <select
                name="foodStatus"
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="Available">Available</option>
                <option value="Delivered">Delivered</option>
              </select>
              <input
                className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="text"
                name="additionalDonatorNotes"
                required
                placeholder="Additional Donator Notes "
                defaultValue={additionalDonatorNotes}
              />
              <input
                className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                value="Update Food"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
