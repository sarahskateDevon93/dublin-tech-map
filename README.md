# 📍 Dublin Career Hubs - Interactive Job Map

An interactive, high-performance web application designed to help job seekers visualize the corporate landscape of Dublin, Ireland. 

**Live Demo:** [https://dublin-tech-map.vercel.app](https://dublin-tech-map.vercel.app)

---

## 🌟 Overview

Navigating the Dublin job market can be overwhelming due to the city's unique "hubs" (Silicon Docks, IFSC, Blanchardstown, etc.). This project maps out **150+ major employers** (with a roadmap to 1,500) to help professionals find their next role based on location and industry clusters.

### Key Features
- **Interactive Mapping:** Powered by Leaflet.js for smooth navigation.
- **Marker Clustering:** High-performance rendering of multiple data points to prevent UI lag.
- **Smart Sidebar:** Filter companies by strategic districts (Airport, City Centre, South Dublin Tech, etc.).
- **Responsive Design:** Fully collapsible sidebar for a mobile-friendly experience.
- **Direct Career Access:** Every company pin includes a verified link to their official careers page.

---

## 🛠️ Tech Stack

- **Frontend:** [React.js](https://reactjs.org/) (Vite)
- **Maps:** [Leaflet.js](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Clustering:** [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- **Deployment:** [Vercel](https://vercel.com/)
- **Version Control:** Git & GitHub (Professional Workflow)

---

## 📂 Project Structure

```text
├── src/
│   ├── App.jsx            # Core logic & UI components
│   ├── main.jsx           # Entry point
│   └── companies.json     # The "Data Nest" (Database of coordinates & links)
├── public/                # Static assets & icons
└── README.md              # Project documentation
