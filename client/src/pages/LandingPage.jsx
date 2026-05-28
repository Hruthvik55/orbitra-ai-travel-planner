import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Upload,
  Share2,
  FileText,
  Plane,
} from "lucide-react";


const LandingPage = () => {

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">

              <Plane className="text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-slate-800">
                Orbitra AI
              </h1>

              <p className="text-sm text-slate-500">
                Smart Travel Planner
              </p>

            </div>

          </div>


          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                navigate("/login")
              }
              className="text-slate-700 font-medium"
            >
              Login
            </button>


            <button
              onClick={() =>
                navigate("/register")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold transition-all"
            >
              Get Started
            </button>

          </div>

        </div>

      </div>



      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">

              <Sparkles size={18} />

              AI Powered Travel Planning

            </div>


            <h1 className="text-6xl font-bold leading-tight text-slate-900">

              Upload Bookings.
              <br />

              Generate Smart
              <span className="text-blue-600">
                {" "}Travel Plans
              </span>

            </h1>


            <p className="mt-8 text-xl text-slate-600 leading-relaxed">

              Orbitra AI transforms flight tickets,
              hotel bookings, and travel documents
              into beautiful AI-generated itineraries
              instantly.

            </p>


            <div className="flex flex-col sm:flex-row gap-5 mt-10">

              <button
                onClick={() =>
                  navigate("/register")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all"
              >
                Start Planning
              </button>


              <button
                onClick={() =>
                  navigate("/login")
                }
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-5 rounded-2xl font-semibold text-lg transition-all"
              >
                Login
              </button>

            </div>

          </div>



          {/* Right */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <div className="space-y-6">

              <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Upload className="text-blue-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Upload Travel Docs
                  </h3>

                  <p className="text-slate-500">
                    PDFs, screenshots & bookings
                  </p>

                </div>

              </div>



              <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

                  <Sparkles className="text-indigo-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    AI Itinerary Generation
                  </h3>

                  <p className="text-slate-500">
                    Smart trip planning instantly
                  </p>

                </div>

              </div>



              <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

                  <Share2 className="text-cyan-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Share & Export
                  </h3>

                  <p className="text-slate-500">
                    Public links and PDF export
                  </p>

                </div>

              </div>



              <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                  <FileText className="text-green-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    Organized Trips
                  </h3>

                  <p className="text-slate-500">
                    Flights, hotels & activities
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LandingPage;