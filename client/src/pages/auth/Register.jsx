import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  User,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

import API from "../../services/api";

import useAuth from "../../hooks/useAuth";


const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {
        return toast.error(
          "Please fill all fields"
        );
      }

      setLoading(true);

      const response =
        await API.post(
          "/auth/register",
          formData
        );

      // Proper Auth Context Login
      login(
        response.data.user,
        response.data.token
      );

      toast.success(
        "Registration successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">

          <div className="flex justify-center mb-5">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Sparkles className="text-blue-600" />
            </div>

          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-3">
            Start planning smart AI trips
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-slate-300 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-slate-300 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>


        <p className="text-center text-slate-500 mt-8">

          Already have an account?
          {" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;