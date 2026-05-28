// import { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// import { loginUserService } from "../../services/authService";

// import useAuth from "../../hooks/useAuth";


// const Login = () => {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await loginUserService(formData);

//       login(data.user, data.token);

//       toast.success("Login successful");

//       navigate("/dashboard");

//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Login failed"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">

//       <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

//         <div className="text-center mb-8">

//           <h1 className="text-4xl font-bold text-slate-800">
//             Orbitra AI
//           </h1>

//           <p className="text-slate-500 mt-2">
//             Smart Travel Itinerary Planner
//           </p>

//         </div>


//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div>
//             <label className="block mb-2 text-sm font-medium text-slate-700">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>


//           <div>
//             <label className="block mb-2 text-sm font-medium text-slate-700">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>


//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>


//         <p className="text-center text-sm text-slate-500 mt-6">
//           Don&apos;t have an account?{" "}

//           <Link
//             to="/register"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Register
//           </Link>
//         </p>

//       </div>

//     </div>
//   );
// };

// export default Login;


import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Mail,
  Lock,
  Plane,
} from "lucide-react";

import API from "../../services/api";

import useAuth from "../../hooks/useAuth";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
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
          "/auth/login",
          formData
        );

      login(
        response.data.user,
        response.data.token
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Login failed"
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

              <Plane className="text-blue-600" />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-3">
            Login to continue planning
            your AI-powered trips
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
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
                onChange={
                  handleChange
                }
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
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        <p className="text-center text-slate-500 mt-8">

          Don’t have an account?
          {" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;