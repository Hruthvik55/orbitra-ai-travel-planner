import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { Share2 } from "lucide-react";
import {
  Plane,
  Hotel,
  MapPinned,
  Lightbulb,
} from "lucide-react";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

import API from "../../services/api";

import Loader from "../../components/common/Loader";


const ItineraryDetails = () => {
  const { id } = useParams();

  const [itinerary, setItinerary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const fetchItinerary = async () => {
    try {

      const response = await API.get(
        `/itineraries/${id}`
      );

      setItinerary(
        response.data.itinerary
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load itinerary"
      );

    } finally {

      setLoading(false);

    }
  };


  // PDF Export
  const handleDownloadPDF =
    async () => {

      const element =
        document.getElementById(
          "itinerary-content"
        );

      const canvas =
        await html2canvas(element);

      const data =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const imgWidth = 210;

      const pageHeight = 295;

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;

      let heightLeft =
        imgHeight;

      let position = 0;

      pdf.addImage(
        data,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft >= 0) {

        position =
          heightLeft -
          imgHeight;

        pdf.addPage();

        pdf.addImage(
          data,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;

      }

      pdf.save(
        "orbitra-itinerary.pdf"
      );
    };

    const handleShare = async () => {

  const shareUrl = `${window.location.origin}/share/${itinerary?.shareId}`;

  try {

    await navigator.clipboard.writeText(
      shareUrl
    );

    toast.success(
      "Share link copied!"
    );

  } catch (error) {

    toast.error(
      "Failed to copy link"
    );

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

      <div
        id="itinerary-content"
        className="max-w-6xl mx-auto"
      >

        {/* Hero */}
        <div className="bg-blue-700 rounded-3xl p-10 text-white shadow-2xl mb-8">

          <h1 className="text-5xl font-bold">
            {itinerary?.title ||
              "AI Generated Itinerary"}
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Planned by Orbitra AI
          </p>


<div className="flex gap-4 mt-6">

  <button
    onClick={handleDownloadPDF}
    className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all"
  >
    Export PDF
  </button>


  <button
    onClick={handleShare}
    className="bg-black/20 backdrop-blur text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition-all"
  >
    <Share2 size={18} />

    Share
  </button>

</div>

          <div className="grid md:grid-cols-4 gap-5 mt-10">

            <div className="bg-white/10 rounded-2xl p-5">

              <p className="text-sm text-blue-100">
                Traveler
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  itinerary?.traveler?.name
                }
              </h3>

            </div>


            <div className="bg-white/10 rounded-2xl p-5">

              <p className="text-sm text-blue-100">
                From
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  itinerary?.tripDetails?.source
                }
              </h3>

            </div>


            <div className="bg-white/10 rounded-2xl p-5">

              <p className="text-sm text-blue-100">
                Destination
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  itinerary?.tripDetails?.destination
                }
              </h3>

            </div>


            <div className="bg-white/10 rounded-2xl p-5">

              <p className="text-sm text-blue-100">
                Duration
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  itinerary?.tripDetails?.startDate
                }
              </h3>

            </div>

          </div>

        </div>



        {/* Flights */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <Plane className="text-blue-600" />

            <h2 className="text-3xl font-bold text-slate-800">
              Flights
            </h2>

          </div>


          <div className="space-y-5">

            {itinerary?.flights?.map(
              (flight, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold text-slate-800">
                        {
                          flight.airline
                        }
                      </h3>

                      <p className="text-slate-500">
                        Flight No:
                        {" "}
                        {
                          flight.flightNumber
                        }
                      </p>

                    </div>


                    <div className="text-center">

                      <p className="font-semibold text-slate-700">
                        {flight.from}
                      </p>

                      <p className="text-sm text-slate-500">
                        Departure
                      </p>

                      <p className="mt-1">
                        {
                          flight.departureTime
                        }
                      </p>

                    </div>


                    <div className="text-center">

                      <p className="font-semibold text-slate-700">
                        {flight.to}
                      </p>

                      <p className="text-sm text-slate-500">
                        Arrival
                      </p>

                      <p className="mt-1">
                        {
                          flight.arrivalTime
                        }
                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>



        {/* Hotels */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <Hotel className="text-indigo-600" />

            <h2 className="text-3xl font-bold text-slate-800">
              Hotels
            </h2>

          </div>


          <div className="space-y-5">

            {itinerary?.hotels?.map(
              (hotel, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-5"
                >

                  <h3 className="text-2xl font-bold text-slate-800">
                    {hotel.name}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {hotel.address}
                  </p>


                  <div className="flex gap-10 mt-5">

                    <div>

                      <p className="text-sm text-slate-500">
                        Check In
                      </p>

                      <p className="font-semibold">
                        {
                          hotel.checkIn
                        }
                      </p>

                    </div>


                    <div>

                      <p className="text-sm text-slate-500">
                        Check Out
                      </p>

                      <p className="font-semibold">
                        {
                          hotel.checkOut
                        }
                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>



        {/* Day Plans */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <MapPinned className="text-cyan-600" />

            <h2 className="text-3xl font-bold text-slate-800">
              Daily Itinerary
            </h2>

          </div>


          <div className="space-y-8">

            {itinerary?.itineraryDays?.map(
              (day, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-6"
                >

                  <h3 className="text-2xl font-bold text-slate-800">
                    Day {day.day}:
                    {" "}
                    {day.title}
                  </h3>


                  <ul className="mt-4 space-y-3">

                    {day.activities?.map(
                      (
                        activity,
                        activityIndex
                      ) => (
                        <li
                          key={
                            activityIndex
                          }
                          className="text-slate-600"
                        >
                          • {activity}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )
            )}

          </div>

        </div>



        {/* Tips */}
        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-3xl font-bold text-slate-800">
              Travel Tips
            </h2>

          </div>


          <ul className="space-y-4">

            {itinerary?.travelTips?.map(
              (tip, index) => (
                <li
                  key={index}
                  className="bg-slate-100 rounded-2xl px-5 py-4 text-slate-700"
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

export default ItineraryDetails;