import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { loginSchema, type LoginFormData } from "../../utils/validation";
import { loginUser } from "../../store/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";
import config from "../../utils/config";
import {
  IaccountCircle,
  IfaceBook,
  Igoogle,
  Ikey,
  IloginIllustrate,
  Imail,
  Ivisibility,
} from "../../utils/icons.utils";
import Button from "../../components/customButton";

const { routes } = config;

export default function LogIn() {
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues: LoginFormData = {
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: LoginFormData) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      console.log(resultAction);
      if (loginUser.fulfilled.match(resultAction)) {
        navigate(routes.home);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-14 p-14 items-center h-full bg-[#F4F4F4]">
      <div className="flex justify-center items-center">
        <picture className="">
          <img src={IloginIllustrate} alt="Login Illustration" className="" />
        </picture>
      </div>
      <div className="text-white w-full m-auto h-full p-8 bg-white rounded-[20px] border border-[#E2E2E2] ">
        <h2 className="text-start font-poppins text-4xl font-medium mb-6 text-[#1C1B1F]">
          Welcome to <br />
          <span className="text-5xl font-black text-[#6358DC]">Unstop</span>
        </h2>
        <Button
          className="text-base font-medium font-poppins w-full mb-4 bg-white border border-[#E2E2E2] text-[#1C1B1F] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md mt-8"
          icon={Igoogle}
          text="Login with Google"
          onClick={() => alert("Login with Google")}
        />
        <Button
          className="text-base font-medium font-poppins w-full mb-4 bg-white border border-[#E2E2E2] text-[#1C1B1F] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md"
          icon={IfaceBook}
          text="Login with Facebook"
          onClick={() => alert("Login with Facebook")}
        />
        <div className="flex items-center gap-4 justify-center my-8">
          <div className="h-px bg-[#BFBFBF] w-full"></div>
          <span className=" text-base font-normal uppercase text-[#1C1B1F]">
            or
          </span>
          <div className="h-px bg-[#BFBFBF] w-full"></div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className=" max-w-full mx-auto flex flex-col gap-4 font-poppins">
              {/* Username */}
              <div>
                <div className="flex items-center text-start w-full bg-[#F4F4F4] rounded-2xl relative">
                  <div className="w-10/12 m-auto pt-2 pb-4">
                    <label className="text-start text-xs font-normal text-[#1C1B1F] mb-2">
                      User name
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username (emilys)"
                      className=" w-full text-[#1C1B1F] font-bold placeholder:text-[#1C1B1F] focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <img
                    src={IaccountCircle}
                    alt="profile"
                    className="absolute left-4"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center text-start w-full bg-[#F4F4F4] rounded-2xl relative">
                  <div className="w-10/12 m-auto pt-2 pb-4">
                    <label className="text-start text-xs font-normal text-[#1C1B1F] mb-2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="username@gmail.com"
                      className=" w-full text-[#1C1B1F] font-bold placeholder:text-[#1C1B1F] focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <img src={Imail} alt="profile" className="absolute left-4" />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center text-start w-full bg-[#F4F4F4] rounded-2xl relative">
                  <div className="w-10/12 m-auto pt-2 pb-4">
                    <label className="text-start text-xs font-normal text-[#1C1B1F] mb-2">
                      Password
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password (min 8 chars)"
                      className=" w-full text-[#1C1B1F] font-bold placeholder:text-[#1C1B1F] focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <img src={Ikey} alt="profile" className="absolute left-4" />
                  <img
                    src={Ivisibility}
                    alt="visibility toggle"
                    className="absolute right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Remember Me */}
              <div className="flex justify-between items-center my-5">
                <label className="flex items-center text-base font-normal text-[#1C1B1F]">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="appearance-none h-5 w-5 border border-gray-300 rounded bg-[#E2E2E2] checked:bg-[#1C1B1F] checked:border-[#1C1B1F] mr-2 relative focus:outline-none focus:ring-0
                     checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                     checked:after:w-3 checked:after:h-3 checked:after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE5LjcxNiA3LjI4M2EzLjAwMSAzLjAwMSAwIDAwLTQuMjQyIDBsLTcuMDcgNy4wNy0zLjUzNS0zLjUzNWEzLjAwMSAzLjAwMSAwIDAwLTQuMjQyIDQuMjQyIDMuMDAxIDMuMDAxIDAgMDAuMDA2IDQuMjQyTDEwLjI0IDE4LjY1MWw3LjA3LTcuMDdjMS4xNy0xLjE3IDEuMTctMy4wNzMgMC00LjI0M3oiLz48L3N2Zz4=')] checked:after:bg-no-repeat checked:after:bg-center"
                  />
                  Remember Me
                </label>
                <Link
                  to="#"
                  className="text-[#6358DC] text-base font-normal float-right"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                className="text-base font-semibold w-full bg-[#6358DC] border border-[#E2E2E2] text-white py-6 rounded-2xl flex items-center justify-center gap-2 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.05)]"
                disabled={loading || !isValid || !dirty}
                text={loading ? "Logging in..." : "Login"}
              />
              {error && <p className="text-red-500 ">{error}</p>}

              <span className="text-base font-normal text-[#1C1B1F]">Don’t have an account? <Link to="#" className="text-[#6358DC]">Register</Link></span>
            </Form>
          )}
          
        </Formik>
      </div>
    </div>
  );
}
