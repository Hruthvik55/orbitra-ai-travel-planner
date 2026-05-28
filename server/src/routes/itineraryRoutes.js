import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  createItinerary,
  getUserItineraries,
  getSingleItinerary,
  deleteItinerary,
  getSharedItinerary,
} from "../controllers/itineraryController.js";

const router = express.Router();


// Create itinerary
router.post(
  "/upload",
  protect,
  upload.single("travelDocument"),
  createItinerary
);


// Get all itineraries
router.get(
  "/",
  protect,
  getUserItineraries
);


// Public shared itinerary
router.get(
  "/share/:shareId",
  getSharedItinerary
);


// Get single itinerary
router.get(
  "/:id",
  protect,
  getSingleItinerary
);


// Delete itinerary
router.delete(
  "/:id",
  protect,
  deleteItinerary
);

export default router;