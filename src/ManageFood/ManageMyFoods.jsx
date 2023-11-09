import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useTable } from "react-table";

const ManageMyFoods = () => {
  const [emailBasedDonatedFoodsPrev, setEmailBasedDonatedFoodsPrev] = useState(
    []
  );
  const [emailBasedDonatedFoods, setEmailBasedDonatedFoods] = useState(
    emailBasedDonatedFoodsPrev
  );

  const { user } = useContext(AuthContext);
  const url = `https://zero-hunger-server-five.vercel.app/available-foods?donatorEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmailBasedDonatedFoods(data);
      });
  }, [url]);

  const handleDelete = (id) => {
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
        fetch(
          `https://zero-hunger-server-five.vercel.app/available-foods-delete/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
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

  const data = React.useMemo(
    () => emailBasedDonatedFoods,
    [emailBasedDonatedFoods]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Food Name",
        accessor: "foodName",
      },
      {
        Header: "Food Image",
        accessor: "foodImage",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Food"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Donator Email",
        accessor: "donatorEmail",
      },
      {
        Header: "Location",
        accessor: "foodPickUpLocation",
      },
      {
        Header: "Expiry Date",
        accessor: "foodExpiryDate",
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <div className="flex justify-center space-x-2">
            <Link to={`/update-food/${value}`}>
              <button
                className="edit-button hover:cursor-pointer    mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => handleManageFood(value)}
              >
                Edit
              </button>
            </Link>
            <button
              className="delete-button  hover:cursor-pointer   mx-auto  select-none rounded-lg bg-gradient-to-tr from-[#ec5252] to-[#cf4242] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => handleDelete(value)}
            >
              Delete
            </button>
            <Link to={`/manage-my-food/${value}`}>
              <button
                className="manage-button hover:cursor-pointer   mx-auto select-none rounded-lg bg-gradient-to-tr from-[#327fa3] to-[#57a1b3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => handleManageFood(value)}
              >
                Manage
              </button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-10 xl:mx-16 2xl:mx-20">
      <Helmet>
        <title>ZeroHunger | Manage My Foods</title>
      </Helmet>
      <div>
        <h1 className="mt-6 sm:mt-10 font-bold text-2xl sm:text-4xl text-center">
          My Donated Foods
        </h1>
        <h1 className="m-2 sm:m-4 text-center">Email: {user?.email}</h1>
        <div className="m-4 sm:m-10">
          <table className="table w-full" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key="" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key="" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr key="" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td key="" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
