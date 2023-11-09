import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyFoodRequest = () => {
  const [requestedFoodsPrev, setRequestedFoodsPrev] = useState([]);
  const [requestedFoods, setRequestedFoods] = useState(requestedFoodsPrev);

  console.log(requestedFoods);

  // delete request
  const handleRequestDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Go Back",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel Food Request",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://zero-hunger-server-five.vercel.app/requested-food-delete/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your food request is cancelled.",
                icon: "success",
              });

              const remaining = requestedFoods.filter(
                (requestedFood) => requestedFood._id !== id
              );
              setRequestedFoods(remaining);
            }
          });
      }
    });
  };

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
    noteByReceiver,
    receiverDonateMoney,
    currentTimeInMs,
    currentTime,
    requestStatus,
  } = requestedFoods;

  const { user } = useContext(AuthContext);
  const url = `https://zero-hunger-server-five.vercel.app/requested-foods?receiverEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRequestedFoods(data);
      });
  }, [url]);

  return (
    <div>
      <Helmet>
        <title>ZeroHunger | Food Request</title>
      </Helmet>
      <div>
        <h1 className="mt-10 font-bold text-4xl text-center">
          My Requested Foods
        </h1>
        <h1 className="m-4  text-center">Email: {user?.email}</h1>
        {requestedFoods.map((requestedFood) => (
          <div key={requestedFood._id}>
            <div className="m-10">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <div className="ms-10 flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-24 ">
                            <img
                              src={requestedFood.foodImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {requestedFood.foodName}
                          </div>
                          <div className="text-sm opacity-50">
                            Food Id: {requestedFood._id}
                          </div>
                          <div className="text-sm opacity-50">
                            Donator Name: {requestedFood.donatorName}
                          </div>
                          <div className="text-sm opacity-50">
                            Donator Email: {requestedFood.donatorEmail}
                          </div>
                          <div className="text-sm opacity-50">
                            Location: {requestedFood.foodPickUpLocation}
                          </div>
                          <div className="text-sm opacity-50">
                            Expiry Date: {requestedFood.foodExpiryDate}
                          </div>
                          <div className="text-sm opacity-50">
                            Requested At: {requestedFood.currentTime}
                          </div>
                          <div className="text-sm opacity-50">
                            Receiver Email: {requestedFood.receiverEmail}
                          </div>
                          <div className="text-sm opacity-50">
                            Receiver Donation: $
                            {requestedFood.receiverDonateMoney}
                          </div>
                          <div className="text-sm opacity-50">
                            Food Status: {requestedFood.foodStatus}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p className="m-2 p-3 font-bold rounded-lg text-white text-center  bg-[#a3324a]">
                        Request Status: {requestedFood.requestStatus}
                      </p>
                    </td>

                    <th>
                      {requestedFood.requestStatus !== "Delivered" ? (
                        <button
                          onClick={() => handleRequestDelete(requestedFood._id)}
                          className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Cancel Request
                        </button>
                      ) : (
                        ""
                      )}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoodRequest;
