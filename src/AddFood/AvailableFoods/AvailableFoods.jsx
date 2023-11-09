import { useLoaderData } from "react-router-dom";
import AvailableFoodsCard from "./AvailableFoodsCard";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

const AvailableFoods = () => {
  // const availableFoods = useLoaderData();
  const [availableFoods, setAvailableFoods] = useState([]);
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    fetch(
      `https://zero-hunger-server-five.vercel.app/available-foods?search=${search}&sort=${
        asc ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setAvailableFoods(data));
  }, [asc, search]);

  return (
    <div>
      <Helmet>
        <title>ZeroHunger | Available Foods</title>
      </Helmet>

      <button
        onClick={() => setAsc(!asc)}
        className="hover:cursor-pointer block my-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Click to sort by: {asc ? "Later Expiry Date" : "Near Expiry Date"}
      </button>
      <p className="text-center">
        Sorted by: {asc ? "Near Expiry Date" : "Later Expiry Date"}
      </p>
      <div className=" justify-center m-10 flex">
        <div className="form-control">
          <div className="input-group">
            <input
              onChange={() => {
                setSearch(searchRef.current.value);
              }}
              ref={searchRef}
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button
              onClick={() => {
                {
                  searchRef.current.value === "" &&
                    Swal.fire({
                      icon: "error",
                      title: "Search Box Empty",
                      text: "Please write something on search box",
                    });
                }
                setSearch(searchRef.current.value);
              }}
              className="btn btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <p className="m-5 text-center">Searching: {search}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {availableFoods.map((availableFood) => (
          <AvailableFoodsCard
            key={availableFood._id}
            availableFood={availableFood}
          ></AvailableFoodsCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
