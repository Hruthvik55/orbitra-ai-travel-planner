import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shareId: {
      type: String,
      unique: true,
      required: true,
    },

    uploadedFileName: {
      type: String,
      default: "",
    },

    extractedText: {
      type: String,
      default: "",
    },

    traveler: {
      name: {
        type: String,
        default: "",
      },
    },

    tripDetails: {
      source: {
        type: String,
        default: "",
      },

      destination: {
        type: String,
        default: "",
      },

      startDate: {
        type: String,
        default: "",
      },

      endDate: {
        type: String,
        default: "",
      },
    },

    flights: [
      {
        airline: String,
        flightNumber: String,
        from: String,
        to: String,
        departureTime: String,
        arrivalTime: String,
      },
    ],

    hotels: [
      {
        name: String,
        checkIn: String,
        checkOut: String,
        address: String,
      },
    ],

    itineraryDays: [
      {
        day: Number,

        title: String,

        activities: [String],
      },
    ],

    travelTips: [String],
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model(
  "Itinerary",
  itinerarySchema
);

export default Itinerary;