import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const donatorName = user?.displayName || "no-name";
  const donatorEmail = user?.email || "no-email";
  const donatorImage = user?.photoURL || "no-photo";

  const handleAddFood = (e) => {
    // console.log("Added", user);
    e.preventDefault();

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

    const addedFoodInfo = {
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
    console.log(addedFoodInfo);

    //   Send Data to Server Side
    fetch("http://localhost:5000/available-foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addedFoodInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire("Food Successfully Added For Donation");
        }
      });
  };

  return (
    <div className="flex justify-center m-20">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#32a374] to-[#57b38d] bg-clip-border text-white shadow-lg shadow-green-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Add Food
          </h3>
        </div>

        <div>
          <form onSubmit={handleAddFood}>
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
            />
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              name="foodImage"
              required
              placeholder="Food Image URL"
            />
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="number"
              name="foodQuantity"
              required
              placeholder="Food Quantity"
            />
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="date"
              name="foodExpiryDate"
              required
              placeholder="Food Expiry Date"
            />
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="text"
              name="foodPickUpLocation"
              required
              placeholder="Food Pickup Location"
            />

            {/* <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="email"
              name="email"
              required
              disabled
              placeholder={
                user?.photoURL
                  ? `Donator Photo: ${user.photoURL}`
                  : `Donator Email: Not logged In`
              }
            /> */}
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
            />
            <input
              className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Add Food"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
