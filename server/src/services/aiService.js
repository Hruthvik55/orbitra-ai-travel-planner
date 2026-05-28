const generateItineraryWithAI = async (
  rawText
) => {
  try {

    // Mock AI Generated Response
    return {
      title: "Goa Vacation Plan",

      traveler: {
        name: "Orbitra User",
      },

      tripDetails: {
        source: "Hyderabad",
        destination: "Goa",
        startDate: "2026-06-10",
        endDate: "2026-06-15",
      },

      flights: [
        {
          airline: "IndiGo",
          flightNumber: "6E-245",
          from: "Hyderabad",
          to: "Goa",
          departureTime: "10:00 AM",
          arrivalTime: "11:30 AM",
        },
      ],

      hotels: [
        {
          name: "Sea View Resort",
          checkIn: "2026-06-10",
          checkOut: "2026-06-15",
          address: "Baga Beach, Goa",
        },
      ],

      itineraryDays: [
        {
          day: 1,
          title: "Arrival & Beach Visit",

          activities: [
            "Check into hotel",
            "Relax at Baga Beach",
            "Dinner at beachside cafe",
          ],
        },

        {
          day: 2,
          title: "North Goa Exploration",

          activities: [
            "Visit Fort Aguada",
            "Explore Calangute Beach",
            "Night market shopping",
          ],
        },

        {
          day: 3,
          title: "Water Sports Adventure",

          activities: [
            "Parasailing",
            "Jet Ski",
            "Sunset Cruise",
          ],
        },
      ],

      travelTips: [
        "Carry sunscreen",
        "Keep ID proof handy",
        "Stay hydrated",
        "Use local transport apps",
      ],

      content: `
DAY 1
- Arrival in Goa
- Hotel check-in
- Baga Beach visit
- Beachside dinner

DAY 2
- Fort Aguada
- Calangute Beach
- Night Market

DAY 3
- Water Sports
- Shopping
- Sunset Cruise
      `,

      rawExtractedText: rawText,
    };

  } catch (error) {
    console.error(
      "Mock AI Service Error:",
      error
    );

    throw new Error(
      "Failed to generate itinerary"
    );
  }
};

export default generateItineraryWithAI;