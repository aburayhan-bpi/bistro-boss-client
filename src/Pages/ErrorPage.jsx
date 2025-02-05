import React from "react";
import animatedError from "../../src/assets/error/error.json";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Lottie loop animationData={animatedError} play className="w-96 h-96" />
      <h1 className="mt-5 text-xl font-bold text-red-500">
        Oops! Page Not Found
      </h1>
      <button onClick={() => navigate("/")} className="btn bg-green-300 mt-4">
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
