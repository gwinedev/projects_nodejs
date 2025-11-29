import React from "react";
import GenderCheckbox from "../login/GenderCheckbox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify- min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white/10 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Signup
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Gender checkbox */}
          <GenderCheckbox />
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block"
          >
            Already have an account? Login here
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
