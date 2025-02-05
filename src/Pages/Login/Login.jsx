import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import loginBg from "../../assets/others/authentication.png";
import loginSideImg from "../../assets/others/authentication1.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../../hooks/useAuthContext";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { user, loginUser, googleRegister } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  // const { user } = useContext(AuthContext);
  // console.log(user?.email);

  const captchaRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const validatingCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  // console.log(disabled);
  // console.log(location);
  const handleLogin = (e) => {
    e.preventDefault();

    const formElement = e.target;
    const form = new FormData(formElement);
    const email = form.get("email");
    const password = form.get("password");
    const loginDetails = { email, password };
    // console.log(loginDetails);

    loginUser(email, password)
      .then((result) => {
        // console.log(result);
        navigate(location.state ? location.state : "/");
        Swal.fire({
          title: "Login success!",
          icon: "success",
          // draggable: true,
        });
      })
      .catch((err) => {
        setErrorMsg("Provide valid information");
        // console.log(err.message);
      });

    formElement.reset();
    setDisabled(true);
  };

  // register or login with google

  const handleGoogleRegister = () => {
    googleRegister()
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);

          navigate("/");
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Helmet>
        <title>Bisto Boss | Login</title>
      </Helmet>
      <section className="min-h-screen dark:bg-gray-900 pt-20 loginBg">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-fit">
            <div>{/* <img src='' alt="" /> */}</div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log In to your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
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
                    placeholder="Enter password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
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
                  <div className="flex justify-between mt-2">
                    <div>
                      {errorMsg && (
                        <p className="text-xs text-red-500">{errorMsg}</p>
                      )}
                    </div>
                    {/* <a className=" text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a> */}
                  </div>
                </div>
                <div>
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="captcha"
                    name="captcha"
                    ref={captchaRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type Captcha Code"
                    required=""
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      validatingCaptcha(); // Call your validateCaptcha function
                    }}
                    className="w-full bg-yellow-100 rounded-md p-1 mt-2"
                  >
                    Validate Captcha
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={disabled}
                  className={
                    disabled
                      ? "w-full bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      : "w-full bg-success hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  }
                >
                  Login
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
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
