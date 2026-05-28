import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
  Plus,
  MapPinned,
  Eye,
  Trash2,
  Plane,
  Sparkles,
  Calendar,
} from "lucide-react";

import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import API from "../../services/api";


const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [itineraries, setItineraries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);


  // Logout
  const handleLogout = () => {
    logout();

    navigate("/login");
  };


  // Fetch itineraries
  const fetchItineraries = async () => {
    try {

      const response = await API.get(
        "/itineraries"
      );

      setItineraries(
        response.data.itineraries
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load itineraries"
      );

    } finally {

      setLoading(false);

    }
  };


  // Delete itinerary
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this itinerary?"
      );

    if (!confirmDelete) return;

    try {

      setDeletingId(id);

      await API.delete(
        `/itineraries/${id}`
      );

      setItineraries((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      toast.success(
        "Itinerary deleted"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Delete failed"
      );

    } finally {

      setDeletingId(null);

    }
  };


  useEffect(() => {
    fetchItineraries();
  }, []);


  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-blue-600" />

              Orbitra AI
            </h1>

            <p className="text-slate-500 mt-1">
              Smart Travel Planner
            </p>

          </div>


          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold text-slate-700">
                {user?.name}
              </p>

              <p className="text-sm text-slate-500">
                {user?.email}
              </p>

            </div>


            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-2xl transition-all"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </div>



      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="bg-blue-700 rounded-3xl p-10 text-white shadow-xl">

          <div className="max-w-2xl">

            <h2 className="text-5xl font-bold leading-tight">
              Plan Smarter Trips with AI
            </h2>

            <p className="mt-5 text-blue-100 text-lg">
              Upload travel bookings, tickets,
              visas, or screenshots and let
              Orbitra generate intelligent
              travel itineraries instantly.
            </p>


            <button
              onClick={() =>
                navigate("/upload")
              }
              className="mt-8 bg-white text-blue-700 font-semibold px-6 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"
            >
              <Plus size={20} />

              Create New Itinerary
            </button>

          </div>

        </div>



        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <Plane className="text-blue-600" />
            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              {itineraries.length}
            </h3>

            <p className="text-slate-500 mt-2">
              Total Trips
            </p>

          </div>


          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
              <Sparkles className="text-indigo-600" />
            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              AI
            </h3>

            <p className="text-slate-500 mt-2">
              OCR + Itinerary Generation
            </p>

          </div>


          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-4">
              <Calendar className="text-cyan-600" />
            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              PDF
            </h3>

            <p className="text-slate-500 mt-2">
              Export & Share Enabled
            </p>

          </div>

        </div>



        {/* Itineraries */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold text-slate-800">
              Your Itineraries
            </h2>

          </div>


          {loading ? (

            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
              Loading itineraries...
            </div>

          ) : itineraries.length === 0 ? (

            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

              <h3 className="text-3xl font-bold text-slate-800">
                No itineraries yet
              </h3>

              <p className="text-slate-500 mt-4">
                Upload travel documents to
                generate your first AI trip.
              </p>


              <button
                onClick={() =>
                  navigate("/upload")
                }
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all"
              >
                Start Planning
              </button>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {itineraries.map(
                (itinerary) => (
                  <div
                    key={itinerary._id}
                    className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="text-2xl font-bold text-slate-800">
                          {
                            itinerary.title
                          }
                        </h3>

                        <p className="text-slate-500 mt-3">
                          {
                            itinerary
                              ?.tripDetails
                              ?.source
                          }
                          {" → "}
                          {
                            itinerary
                              ?.tripDetails
                              ?.destination
                          }
                        </p>

                        <p className="text-sm text-slate-400 mt-2">
                          {
                            itinerary
                              ?.tripDetails
                              ?.startDate
                          }
                        </p>

                      </div>


                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <MapPinned className="text-blue-600" />
                      </div>

                    </div>



                    <div className="flex gap-3 mt-8">

                      <button
                        onClick={() =>
                          navigate(
                            `/itinerary/${itinerary._id}`
                          )
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all"
                      >
                        <Eye size={18} />

                        View
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(
                            itinerary._id
                          )
                        }
                        disabled={
                          deletingId ===
                          itinerary._id
                        }
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-4 rounded-2xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;