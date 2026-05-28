import Itinerary from "../models/Itinerary.js";

import createItineraryService from "../services/itineraryService.js";


// @desc Create itinerary
// @route POST /api/itineraries/upload
// @access Private

export const createItinerary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const itinerary = await createItineraryService({
      file: req.file,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Itinerary generated successfully",
      itinerary,
    });

  } catch (error) {
    console.error("Create Itinerary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate itinerary",
    });
  }
};


// @desc Get all itineraries
// @route GET /api/itineraries
// @access Private

export const getUserItineraries = async (
  req,
  res
) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      itineraries,
    });

  } catch (error) {
    console.error("Get Itineraries Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch itineraries",
    });
  }
};


// @desc Get single itinerary
// @route GET /api/itineraries/:id
// @access Private

export const getSingleItinerary = async (
  req,
  res
) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    res.status(200).json({
      success: true,
      itinerary,
    });

  } catch (error) {
    console.error("Get Single Itinerary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch itinerary",
    });
  }
};


// @desc Delete itinerary
// @route DELETE /api/itineraries/:id
// @access Private

export const deleteItinerary = async (
  req,
  res
) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    await itinerary.deleteOne();

    res.status(200).json({
      success: true,
      message: "Itinerary deleted successfully",
    });

  } catch (error) {
    console.error("Delete Itinerary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete itinerary",
    });
  }
};


// @desc Public shared itinerary
// @route GET /api/itineraries/share/:shareId
// @access Public

export const getSharedItinerary = async (
  req,
  res
) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareId: req.params.shareId,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Shared itinerary not found",
      });
    }

    res.status(200).json({
      success: true,
      itinerary,
    });

  } catch (error) {
    console.error("Shared Itinerary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shared itinerary",
    });
  }
};