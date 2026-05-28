# Orbitra AI Travel Planner

Orbitra AI is a MERN stack web application where users can upload travel booking documents and generate AI-based travel itineraries.

## Live Links

Frontend:
https://orbitra-ai-travel-planner.vercel.app/

Backend:
https://orbitra-ai-travel-planner.onrender.com

GitHub Repo:
https://github.com/Hruthvik55/orbitra-ai-travel-planner

---

# Features

* JWT Authentication (Login/Register)
* Upload travel PDFs and images
* OCR text extraction
* AI-generated travel itineraries
* Store itineraries in MongoDB
* View itinerary history
* Share itinerary links
* Export itinerary as PDF
* Responsive UI

---

# Tech Stack

Frontend:

* React.js
* Tailwind CSS
* Vite

Backend:

* Node.js
* Express.js
* MongoDB

Other Tools:

* Tesseract.js
* pdf2json
* JWT
* Multer

Deployment:

* Vercel
* Render
* MongoDB Atlas

---

# Setup

## Frontend

```bash id="r1"
cd client
npm install
npm run dev
```

## Backend

```bash id="r2"
cd server
npm install
npm run dev
```

---

# Environment Variables

```env id="r3"
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

---

# Note

Gemini API integration was initially implemented for itinerary generation.
Due to API validation/quota issues during deployment, a fallback OCR-based itinerary generation system was used for stable functionality.

---

# Author

Hruthvik R
