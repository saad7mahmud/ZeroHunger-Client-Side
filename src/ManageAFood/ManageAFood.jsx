import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageAFood = () => {
  const [requestOnMyDonations, setRequestOnMyDonations] = useState([]);
  const data = useLoaderData();
  console.log(data);
  const { user } = useContext(AuthContext);

  const {
    _id,
    requestedId,
    foodName,
    foodImage,
    foodQuantityNumber,
    foodExpiryDate,
    expiryDateMs,
    foodPickUpLocation,
    receiverImage,
    foodStatus,
    additionalDonatorNotes,
    donatorName,
    donatorEmail,
    donatorImage,
    receiverEmail,
    receiverName,
    noteByReceiver,
    receiverDonateMoney,
    currentTimeInMs,
    currentTime,
    requestStatus,
  } = requestOnMyDonations;

  console.log(_id);

  const userEmail = user?.email;
  const reqID = data[0]?.requestedId;

  const url = `http://localhost:5000/requested-foods-select?donatorEmail=${userEmail}&requestedId=${reqID}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRequestOnMyDonations(data);
      });
  }, [url]);

  const handleDeliver = (e) => {
    e.preventDefault();
    const requestStatus = e.target.requestStatus.value;
    const requestStatusObj = { requestStatus };

    fetch(
      `http://localhost:5000/deliver-status-update/${data[0]?.requestedId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestStatusObj),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Food Successfully Delivered",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (data.modifiedCount === 0) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Already Delivered",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1 className="mt-10 font-bold text-4xl text-center">
        All Food Requests
      </h1>
      <h1 className="m-4  text-center">Donator Email: {user?.email}</h1>
      {data.length == 0 ? (
        <div>
          <div className="max-w-sm mx-auto m-10 mockup-window border bg-base-300">
            <div className=" flex justify-center px-4 py-16 bg-base-200">
              No Food Request Found
            </div>
          </div>
        </div>
      ) : (
        <div>
          {requestOnMyDonations.map((requestOnMyDonation) => (
            <div key={requestOnMyDonation._id}>
              <div>
                <div className="m-10">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <div className="ms-10 flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-24 ">
                                <img
                                  src={requestOnMyDonation.receiverImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="font-semibold my-2 text-3xl">
                                {requestOnMyDonation.foodName}
                              </div>
                              <div className="text-md opacity-80">
                                Food Id: {requestOnMyDonation._id}
                              </div>
                              <div className="text-md font-bold  opacity-80">
                                Requested by: {requestOnMyDonation.receiverName}
                              </div>
                              <div className="text-md opacity-80 font-bold ">
                                Requester Email:{" "}
                                {requestOnMyDonation.receiverEmail}
                              </div>
                              <div className="text-md opacity-80 font-bold ">
                                Request Date: {requestOnMyDonation.currentTime}
                              </div>
                              <div className="text-md opacity-80">
                                Location:{" "}
                                {requestOnMyDonation.foodPickUpLocation}
                              </div>
                              <div className="text-md opacity-80">
                                Donator Email:{" "}
                                {requestOnMyDonation.donatorEmail}
                              </div>
                            </div>
                          </div>
                        </td>

                        <th>
                          <button className="mx-4 ">
                            Request Status: {requestOnMyDonation.requestStatus}
                          </button>

                          {requestOnMyDonation.requestStatus !== "Delivered" ? (
                            <button
                              onClick={() =>
                                document
                                  .getElementById("my_modal_5")
                                  .showModal()
                              }
                              className="hover:cursor-pointer    mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-80 disabled:shadow-none"
                            >
                              Change Status
                            </button>
                          ) : (
                            ""
                          )}

                          <dialog
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg text-center">
                                Change Status
                              </h3>
                              <p className="py-4 text-center">
                                You can deliver the food request
                              </p>
                              <p className="py-4 text-center">
                                Requested Food Id:{" "}
                                {requestOnMyDonation.requestedId}
                              </p>
                              <form onSubmit={handleDeliver}>
                                <select
                                  name="requestStatus"
                                  className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                >
                                  <option
                                    className="text-xl m-3 p-3"
                                    value="Delivered"
                                  >
                                    Delivered
                                  </option>
                                </select>
                                <input
                                  className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  type="submit"
                                  value="Deliver"
                                />
                              </form>
                              <div className="modal-action">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAFood;
