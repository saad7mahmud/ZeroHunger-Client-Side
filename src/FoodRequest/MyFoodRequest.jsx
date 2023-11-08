import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";

const MyFoodRequest = () => {
  const [requestedFoods, setRequestedFoods] = useState([]);
  console.log(requestedFoods);

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
  } = requestedFoods;

  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/requested-foods?receiverEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRequestedFoods(data);
      });
  }, [url]);

  return (
    <div>
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
                        </div>
                      </div>
                    </td>

                    <th>
                      <td>Status: {requestedFood.foodStatus}</td>
                    </th>

                    <th>
                      {requestedFood.foodStatus !== "Delivered" ? (
                        <button className="btn m-2 btn-primary btn-xs">
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
