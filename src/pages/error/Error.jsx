import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/we-print-logo-1440w.png";

export default function Error() {
  return (
    <div className="flex justify-center items-center flex-col space-y-12">
      <div className="text-zinc-500 text-2xl font-bold mt-32 md:text-3xl">
        Sorry, page not found !
      </div>
      <div className="flex justify-center items-center flex-col space-y-2">
        <p className="text-sm font-bold flex md:text-lg">
          Perhaps you’ve mistyped the URL?
        </p>
        <p className="text-sm font-bold flex md:text-lg">
          Be sure to check your spelling.
        </p>
      </div>
      <div>
        <img className="border-3 border-indigo-500 rounded-full w-72 mx-auto md:w-96" src={logo} alt="" />
      </div>
      <div>
        <Link className="flex text-md bg-white-500 border-2 border-cyan-500 rounded-full text-cyan-500 px-7 py-1 mt-4 md:text-lg" to="/">
          Go to Home
        </Link>
      </div>      
    </div>
  );
}
