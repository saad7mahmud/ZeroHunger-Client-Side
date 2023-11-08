import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const { googleSignIn, logIn } = useContext(AuthContext);

  const handleGoogle = () => {
    googleSignIn();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password);

    console.log(email, password);
    if (email && password) {
      form.reset();
    }
  };

  return (
    <div className="flex justify-center m-20">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#32a374] to-[#57b38d] bg-clip-border text-white shadow-lg shadow-green-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Log In
          </h3>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="email"
              name="email"
              required
              placeholder="Your Email Address"
            />
            <input
              className="my-5 peer h-full w-3/4 mx-auto flex rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="password"
              name="password"
              required
              placeholder="Your Password"
            />
            <input
              className="hover:cursor-pointer block w-1/4 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Login"
            />
          </form>
        </div>
        <div className="p-6 pt-0">
          <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Do not have an account?
            <Link to="/register">
              <span className="ml-1 mb-6 block font-sans text-sm font-bold leading-normal text-green-500 antialiased">
                Register
              </span>
            </Link>
          </p>
          <hr />
          <h1 className="text-center mb-4 mt-5">Or continue using</h1>
          <button
            onClick={handleGoogle}
            className="flex mx-auto bg-teal-800 text-white px-10 py-3 rounded-xl items-center gap-2"
            type="button"
            data-ripple-light="true"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
