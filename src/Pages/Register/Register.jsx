import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGEBB_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile, googleRegister } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      setErrorMsg("Please upload an image.");
      return;
    }

    const imageFile = { image: data.image[0] };

    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Create user in Firebase/Auth
        createUser(data.email, data.password)
          .then((result) => {
            updateUserProfile(data.name, res.data.data.display_url)
              .then(async () => {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  photoURL: res.data.data.display_url,
                };

                const userRes = await axiosPublic.post("/users", userInfo);
                if (userRes.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Register success!",
                    icon: "success",
                  });
                  navigate("/");
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        setErrorMsg("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred while processing your request.");
    }
  };

  const handleGoogleRegister = () => {
    googleRegister()
      .then(async (result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        const userRes = await axiosPublic.post("/users", userInfo);
        if (userRes.data.insertedId) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Helmet>
        <title>Bisto Boss | Register</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 p-4 mt-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-fit">
            <div>{/* <img src='' alt="" /> */}</div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register to your account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required=""
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600">
                      Name is required
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.image && (
                    <span className="text-xs text-red-600">
                      Image is required
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600">
                      Email is required
                    </span>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,20}$/,
                    })}
                    placeholder="Enter password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600 text-xs">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600 text-xs">
                      Password must be minimum 6 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600 text-xs">
                      Password must contain one digit from 1 to 9, one lowercase
                      letter, one uppercase letter, one special character, no
                      space, and it must be 6-20 characters long.
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600 text-xs">
                      Password must be maximum 20 characters
                    </p>
                  )}
                  <div
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2 top-[2.3rem] bg-gray-300 rounded-md p-1 cursor-pointer"
                  >
                    {showPass ? (
                      <IoIosEye className="size-5" />
                    ) : (
                      <IoIosEyeOff className="size-5" />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-success hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
              </form>

              {/* Google Login */}
              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium text-gray-600">
                  Continue with Google
                </span>
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
