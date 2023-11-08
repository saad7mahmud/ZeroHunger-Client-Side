import { useContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const CustomFoodReq = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    const form = e.target;
    form.name.value = "";
    form.email.value = "";
    form.feedback.value = "";
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Request Sent",
      showConfirmButton: false,
      timer: 1500,
    });

    console.log("Feedback submitted:", { name, email, feedback });
  };

  return (
    <div>
      <h2 className="text-center mb-3 text-4xl font-medium ">
        Request Custom Food
      </h2>
      <p className="text-center text-xl font-normal">
        Request the food you need
      </p>
      <hr
        className="mx-auto m-10"
        width="50%"
        color="blue"
        size="2"
        align="center"
      />
      <div className="my-10 border w-4/5 max-w-md mx-auto p-4 bg-base shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Food Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-white">
              Please give a little description:
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#57b38d] text-white rounded-md py-2 px-4 hover:bg-[#32a374] focus:outline-none focus:ring focus:border-blue-300"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomFoodReq;
