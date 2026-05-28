import fs from "fs";

import Itinerary from "../models/Itinerary.js";

import extractTextFromFile from "./ocrService.js";

import generateItineraryWithAI from "./aiService.js";

import generateShareId from "../utils/generateShareId.js";


const createItineraryService = async ({
  file,
  userId,
}) => {
  try {

    // Extract OCR Text
    const extractedText =
      await extractTextFromFile(
        file.path,
        file.mimetype
      );


    // AI Processing
    const aiData =
      await generateItineraryWithAI(
        extractedText
      );


    // Save Itinerary
    const itinerary = await Itinerary.create({
      user: userId,

      shareId: generateShareId(),

      uploadedFileName:
        file.originalname,

      extractedText,


      // IMPORTANT FIELDS
      title:
        aiData.title ||
        "AI Generated Itinerary",

      content:
        aiData.content || "",


      traveler: aiData.traveler,

      tripDetails:
        aiData.tripDetails,

      flights: aiData.flights,

      hotels: aiData.hotels,

      itineraryDays:
        aiData.itineraryDays,

      travelTips:
        aiData.travelTips,
    });


    // Cleanup Uploaded File
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return itinerary;

  } catch (error) {
    console.error(
      "Create Itinerary Service Error:",
      error
    );

    throw new Error(
      "Failed to create itinerary"
    );
  }
};

export default createItineraryService;