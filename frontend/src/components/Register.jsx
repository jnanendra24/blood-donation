import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const { setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();

  const registerUser = async (newUser) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        newUser
      );
      setUser(response.data._doc);
      navigate("/");
    } catch (error) {
      if (error.response)
        setError("root", { message: error.response.data.message });
      else setError("root", { message: error.message });
    }
  }; // Register User

  return (
    <div className="flex flex-col items-center mt-2">
      <h2 className="text-2xl font-bold mb-6">Register for Blood Donation</h2>
      <form
        className={`flex flex-col space-y-2 border-2 p-6 rounded-md shadow-md hover:scale-105 transition duration-500 ease-in-out`}
        onSubmit={handleSubmit(registerUser)}
      >
        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}
        <input
          {...register("username")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="text"
          placeholder="username"
        />
        <input
          {...register("email")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="email"
          placeholder="email"
        />
        <input
          {...register("phoneNumber")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="tel"
          placeholder="phoneNumber"
        />
        <input
          {...register("location")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="text"
          placeholder="location"
        />
        <input
          {...register("password")}
          className="border border-gray-300 rounded-md p-2 w-64"
          type="password"
          placeholder="password"
        />
        <select
          {...register("bloodType")}
          className="p-2 border border-gray-300 rounded-md w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 w-fit rounded-md hover:scale-105 transition duration-500 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
