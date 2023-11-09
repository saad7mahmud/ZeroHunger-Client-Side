import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ManageMyFoods = () => {
  const [emailBasedDonatedFoodsPrev, setEmailBasedDonatedFoodsPrev] = useState(
    []
  );
  const [emailBasedDonatedFoods, setEmailBasedDonatedFoods] = useState(
    emailBasedDonatedFoodsPrev
  );

  console.log(emailBasedDonatedFoodsPrev);

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
  } = emailBasedDonatedFoods;

  console.log(emailBasedDonatedFoods);

  const handleManageFood = (id) => {
    console.log("clicked", id);
    
  };

  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/available-foods?donatorEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmailBasedDonatedFoods(data);
      });
  }, [url]);

  // Delete Food
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/available-foods-delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success",
              });

              const remaining = emailBasedDonatedFoods.filter(
                (emailBasedDonatedFood) => emailBasedDonatedFood._id !== id
              );
              setEmailBasedDonatedFoods(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className="mt-10 font-bold text-4xl text-center">
          My Donated Foods
        </h1>
        <h1 className="m-4  text-center">Email: {user?.email}</h1>
        {emailBasedDonatedFoods.map((emailBasedDonatedFood) => (
          <div key={emailBasedDonatedFood._id}>
            <div className="m-10">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <div className="ms-10 flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-24 ">
                            <img
                              src={emailBasedDonatedFood.foodImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="font-semibold my-2 text-3xl">
                            {emailBasedDonatedFood.foodName}
                          </div>
                          <div className="text-md opacity-50">
                            Food Id: {emailBasedDonatedFood._id}
                          </div>
                          <div className="text-md opacity-50">
                            Location: {emailBasedDonatedFood.foodPickUpLocation}
                          </div>
                          <div className="text-md opacity-50">
                            Expiry Date: {emailBasedDonatedFood.foodExpiryDate}
                          </div>
                          <div className="text-md opacity-50">
                            Donator Email: {emailBasedDonatedFood.donatorEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <th>
                      <Link
                        className="m-2"
                        to={`/update-food/${emailBasedDonatedFood._id}`}
                      >
                        <button className="hover:cursor-pointer    mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(emailBasedDonatedFood._id)}
                        className="m-2 hover:cursor-pointer   mx-auto  select-none rounded-lg bg-gradient-to-tr from-[#ec5252] to-[#cf4242] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Delete
                      </button>
                      <Link
                        className="m-2"
                        to={`/manage-my-food/${emailBasedDonatedFood._id}`}
                      >
                        <button
                          onClick={() =>
                            handleManageFood(emailBasedDonatedFood._id)
                          }
                          className="hover:cursor-pointer   mx-auto select-none rounded-lg bg-gradient-to-tr from-[#327fa3] to-[#57a1b3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Manage
                        </button>
                      </Link>
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

export default ManageMyFoods;
