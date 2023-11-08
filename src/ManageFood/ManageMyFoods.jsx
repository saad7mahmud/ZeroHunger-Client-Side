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

  const handleManageFood = () => {
    console.log("clicked");
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
                        <div>
                          <div className="font-bold">
                            {emailBasedDonatedFood.foodName}
                          </div>
                          <div className="text-sm opacity-50">
                            Food Id: {emailBasedDonatedFood._id}
                          </div>
                          <div className="text-sm opacity-50">
                            Location: {emailBasedDonatedFood.foodPickUpLocation}
                          </div>
                          <div className="text-sm opacity-50">
                            Expiry Date: {emailBasedDonatedFood.foodExpiryDate}
                          </div>
                          <div className="text-sm opacity-50">
                            Donator Email: {emailBasedDonatedFood.donatorEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <th>
                      <button className="btn m-2 btn-primary btn-xs">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emailBasedDonatedFood._id)}
                        className="btn m-2 text-white btn-error btn-xs"
                      >
                        Delete
                      </button>
                      <Link to={`/manage-a-food/${emailBasedDonatedFood._id}`}>
                        <button
                          onClick={() => handleManageFood()}
                          className="btn m-2  btn-primary btn-xs"
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
