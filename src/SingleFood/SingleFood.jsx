import { Link, useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const SingleFood = () => {
  const singleFoodDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  console.log(singleFoodDetails);

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
  } = singleFoodDetails[0];

  const currentTimeInMs = Date.now();
  const currentTime = new Date();

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const noteByReceiver = form.noteByReceiver.value;
    const receiverDonateMoney = form.receiverDonateMoney.value;
    const receiverEmail = user?.email;
    const receiverImage = user?.photoURL;
    const receiverName = user?.displayName;
    const requestedId = _id;
    const requestStatus = "Pending";

    const foodRequestInfo = {
      requestedId,
      foodName,
      foodImage,
      foodQuantityNumber,
      foodExpiryDate,
      expiryDateMs,
      foodPickUpLocation,
      foodStatus,
      additionalDonatorNotes,
      donatorName,
      receiverImage,
      donatorEmail,
      donatorImage,
      receiverEmail,
      receiverName,
      noteByReceiver,
      receiverDonateMoney,
      currentTimeInMs,
      currentTime,
      requestStatus,
    };
    console.log(foodRequestInfo);

    //   Send Food Request Data to Server Side
    fetch("https://zero-hunger-server-five.vercel.app/requested-foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(foodRequestInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Request Sent",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (data.error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "This food is already requested",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              // Use Tailwind CSS classes to adjust the z-index
              popup: "z-50", // Adjust the z-index as needed
            },
          });
        }
      });
  };

  return (
    <div>
      <div>
        <div className="card w-3/4 m-10 flex mx-auto bg-base shadow-2xl ">
          <figure className=" pt-10">
            <img src={foodImage} alt="Shoes" className=" rounded-xl " />
          </figure>
          <div className="card-body  ">
            <p className="text-2xl font-bold">{foodName}</p>

            <p>
              <span className="font-bold">Food ID: </span>
              {`${_id}`}
            </p>
            <div className="flex items-center gap-2">
              <img className="w-7 rounded-full" src={donatorImage} alt="" />
              <p>
                <span className="font-bold">Donator Name: </span>
                {` ${donatorName}`}
              </p>
            </div>
            <p>
              <span className="font-bold">Food Quantity: </span>
              {`${foodQuantityNumber} Person`}
            </p>
            <p>
              <span className="font-bold">Pickup Location: </span>
              {` ${foodPickUpLocation}`}
            </p>
            <p>
              <span className="font-bold">Expiry Date: </span>
              {` ${foodExpiryDate}`}
            </p>
            <p>
              <span className="font-bold">Additional Notes: </span>
              {`${additionalDonatorNotes}`}
            </p>
            <p>
              <span className="font-bold">Donator Mail: </span>
              {`${donatorEmail}`}
            </p>

            <div className="card-actions">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className=" w-full mt-10 mb-3 btn btn-primary"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Request for food
              </button>
              <dialog
                id="my_modal_5"
                className="z-40 modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box ">
                  <div>
                    <div className="card   bg-base  ">
                      <figure className="px-10 pt-10">
                        <img
                          src={foodImage}
                          alt="Shoes"
                          className="rounded-xl w-2/3"
                        />
                      </figure>
                      <div className="card-body  ">
                        <p className="text-2xl font-bold">{foodName}</p>
                        <p>
                          <span className="font-bold">Food ID: </span>
                          {`${_id}`}
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            className="w-7 rounded-full"
                            src={donatorImage}
                            alt=""
                          />
                          <p>
                            <span className="font-bold">Donator Name: </span>
                            {` ${donatorName}`}
                          </p>
                        </div>
                        <p>
                          <span className="font-bold">Food Quantity: </span>
                          {`${foodQuantityNumber} Person`}
                        </p>
                        <p>
                          <span className="font-bold">Pickup Location: </span>
                          {` ${foodPickUpLocation}`}
                        </p>
                        <p>
                          <span className="font-bold">Expiry Date: </span>
                          {` ${foodExpiryDate}`}
                        </p>
                        <p>
                          <span className="font-bold">Additional Notes: </span>
                          {`${additionalDonatorNotes}`}
                        </p>
                        <p>
                          <span className="font-bold">Donator Mail: </span>
                          {`${donatorEmail}`}
                        </p>
                        <p>
                          <span className="font-bold">
                            Current Time in Ms:{" "}
                          </span>
                          {`${currentTimeInMs}`}
                        </p>
                        <p>
                          <span className="font-bold">Current Time: </span>
                          {`${currentTime}`}
                        </p>
                        <p>
                          <span className="font-bold">Food Status: </span>
                          {`${foodStatus}`}
                        </p>
                        <p>
                          <span className="font-bold">Receiver Email: </span>
                          {`${user?.email ? user.email : "Not logged In"}`}
                        </p>

                        <form onSubmit={handleRequest}>
                          <input
                            className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type="text"
                            name="noteByReceiver"
                            required
                            placeholder="Additional Notes by Receiver"
                          />
                          <input
                            className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type="number"
                            name="receiverDonateMoney"
                            required
                            placeholder="Receiver Donate Money"
                          />

                          <div className="card-actions  ">
                            <div>
                              <input
                                className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit"
                                value="Request"
                              />
                            </div>
                          </div>
                        </form>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="w-full mt-10 mb-3 btn-error btn ">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
