// icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
// react
import { React, useEffect, useState } from "react";
// react-hook-form
import { useForm } from "react-hook-form";
// react-router
import { Link, useNavigate, useParams } from "react-router-dom";
// components
import { Logo, Input } from "../components/index";
// authService
import authservice from "../appwrite/auth";
// import { OAuthProvider } from "appwrite";

// react-redux redux-toolkit
import { login, session as authSassion } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginSignup = () => {
  // react-router-dom
  const { what } = useParams();
  const navigate = useNavigate();

  // react-redux Redux-toolkit
  const dispatch = useDispatch();

  // states
  const [isLogin, setIsLogin] = useState();
  const [isSignup, setIsSignup] = useState();
  const [error, setError] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect's
  useEffect(() => {
    setIsLogin(what == "login" ? true : false);
    setIsSignup(what == "signup" ? true : false);
  }, [useParams, what]);

  // functions
  const onSubmit = async ({ email, password, name }) => {
    setError("");
    // LoginPage
    if (isLogin) {
      try {
        const data = await authservice.Login(email, password);

        if (data) {
          const userdata = await authservice.getCurrentUser();

          if (userdata) {
            const userData = {
              ...userdata,
              id: email,
              password: password,
            };

            dispatch(login(userData));

            // sending redux data to localStorage
            localStorage.setItem("userdata", JSON.stringify(userData));
            localStorage.setItem("id", JSON.stringify(email));
            localStorage.setItem("password", JSON.stringify(password));
            localStorage.setItem("status", "true");
          }

          const session = await authservice.SessionDetail();

          if (session) dispatch(authSassion(session));

          localStorage.setItem("session", JSON.stringify(session));

          navigate("/business");
        }
      } catch (error) {
        setError(error.mesage);
      }
    } else {
      // signiUp page
      try {
        const data = await authservice.CreateAccout(email, password, name);

        if (data) {
          const userdata = await authservice.getCurrentUser();

          if (userdata) {
            const userData = {
              ...userdata,
              id: email,
              password: password,
            };

            dispatch(login(userData));

            // sending redux data to localStorage
            localStorage.setItem("userdata", JSON.stringify(userData));
            localStorage.setItem("id", JSON.stringify(email));
            localStorage.setItem("password", JSON.stringify(password));
            localStorage.setItem("status", "true");
          }

          const session = await authservice.SessionDetail();

          if (session) dispatch(authSassion(session));

          localStorage.setItem("session", JSON.stringify(session));

          navigate("/home");
        }
      } catch (error) {
        setError(error.mesage);
      }
    }
  };

  // OAuth2 in service available in future
  // const OAuth2LoginFunc = async (params) => {
  //   let provider;
  //   let session;
  //   const success_URL = "http://localhost:5173/explore";
  //   const failure_URL = "http://localhost:5173/404";
  //   if (params === "google") {
  //     provider = OAuthProvider.Google;
  //   } else {
  //     provider = OAuthProvider.Facebook;
  //   }
  //   const OAuth2 = await authservice.OAuth2Login(
  //     provider,
  //     success_URL,
  //     failure_URL
  //   );

  //   if (OAuth2) session = await authservice.SessionDetail();

  //   if (session) dispatch(authSassion(session));
  // };

  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center ">
      <div className="bg-white shadow-md rounded-[4rem] p-8 w-full max-w-md min-h-96 border-2 border-solid border-gray-100">
        <div className="flex flex-col items-center justify-center">
          <div className="p-6">
            <Logo size={50} />
          </div>
          <h1 className="text-2xl  text-center mb-6 font-Primary font-medium text-gray-900">
            Welcome to Pinterest
          </h1>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name Input */}
          {isSignup && (
            <div className="mb-4">
              <Input
                className={`${
                  errors.name ? "border-red-500" : "border-gray-300"
                } `}
                type="name"
                label="name"
                {...register("name", { required: "name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <Input
              className={`${
                errors.email ? "border-red-500" : "border-gray-300"
              } `}
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Input
              className={`w-full px-4 py-2 mt-1 border  rounded-md focus:ring-red-500 focus:border-red-500
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-3xl font-Primary font-semibold
             hover:bg-red-800 transition"
          >
            {isLogin ? "Log in" : "Create account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-600 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          {/* Continue with Facebook Button */}
          {/* <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-3xl hover:bg-blue-700 flex items-center justify-center font-Primary font-bold mb-2 text-sm"
            onClick={() => OAuth2LoginFunc("facebook")}
          >
            <FaFacebook size={30} color="white" className="relative right-16" />
            Continue with Facebook
          </button> */}

          {/* Continue with Google Button */}
          {/* <button
            className="w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-3xl hover:bg-gray-100 flex items-center  font-Primary font-medium text-sm text-center
          justify-center"
            onClick={() => OAuth2LoginFunc("google")}
            // ref={googleBtn}
          >
            <FcGoogle size={30} className="relative right-20" />
            Continue with Google
          </button> */}
        </form>

        {/* Additional links */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to={"/auth/signup"} className="text-red-500 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <a href="#" className="text-red-500 hover:underline">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
