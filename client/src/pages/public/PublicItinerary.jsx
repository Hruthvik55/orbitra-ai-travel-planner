import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../services/api";

import Loader from "../../components/common/Loader";


const PublicItinerary = () => {
  const { shareId } = useParams();

  const [itinerary, setItinerary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const fetchItinerary = async () => {
    try {

      const response = await API.get(
        `/itineraries/share/${shareId}`
      );

      setItinerary(
        response.data.itinerary
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load shared itinerary"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchItinerary();
  }, []);


  if (loading) {
    return <Loader />;
  }


  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">

        <h1 className="text-5xl font-bold text-slate-800">
          {itinerary?.title}
        </h1>

        <p className="text-slate-500 mt-4">
          Shared via Orbitra AI
        </p>


        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Trip
          </h2>

          <p className="text-slate-700">
            {
              itinerary?.tripDetails
                ?.source
            }
            {" → "}
            {
              itinerary?.tripDetails
                ?.destination
            }
          </p>

        </div>


        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Travel Tips
          </h2>

          <ul className="space-y-3">

            {itinerary?.travelTips?.map(
              (tip, index) => (
                <li
                  key={index}
                  className="bg-slate-100 p-4 rounded-2xl"
                >
                  {tip}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default PublicItinerary;