# 🥚 eggPrices

> A price tracking tool that automates data collection from the Kroger API and product pages, storing historical pricing in MongoDB for trend analysis over time.

---

## 📖 About

**eggPrices** is a Node.js application built to track grocery prices over time — combining direct API integration with browser automation to capture pricing data that isn't always available through structured endpoints.

The project was built as a hands-on exploration of:

- Combining **API-first** integration with **fallback web scraping** when API data is incomplete
- Building **scheduled automation** that runs without manual intervention
- Storing time-series data in **MongoDB** for historical analysis

---

## ⚙️ How It Works

1. **API Integration** — The app authenticates with the Kroger API to retrieve available product pricing data.
2. **Browser Automation Fallback** — Where the API doesn't expose certain prices or product details, **Puppeteer** controls a headless Chrome instance to scrape Kroger's product pages directly.
3. **Scheduled Execution** — The app runs on a schedule, capturing snapshots of pricing data at regular intervals.
4. **Persistent Storage** — Each snapshot is written to MongoDB, building a historical record that can be queried for trends.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Browser Automation:** Puppeteer
- **Database:** MongoDB (via Mongoose)
- **External APIs:** Kroger API
- **Deployment:** Heroku-ready (Procfile included)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Kroger Developer API credentials

### Installation

```bash
git clone https://github.com/andrewSantanastaso/eggPrices.git
cd eggPrices
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret
PORT=3000
```

### Running Locally

```bash
node server.js
```

---

## 📂 Project Structure

```
eggPrices/
├── controllers/        # Route handlers and business logic
├── middleware/
│   └── services/       # API integration and scraping logic
├── models/             # Mongoose schemas
├── config.js           # Configuration
├── server.js           # App entry point
└── Procfile            # Heroku deployment config
```

---

## 🎯 What I Learned

- **API-first design with pragmatic fallback** — Defaulting to structured API integration where available, but knowing how and when to fall back to browser automation for unstructured data
- **Headless browser automation** — Using Puppeteer to navigate dynamically-rendered pages and extract data from inconsistent UI structures
- **Time-series data modeling** — Designing MongoDB schemas to capture price snapshots over time without bloating the database
- **Scheduled job design** — Building automation that runs reliably without manual triggering

---

## 👤 Author

**Andrew Santanastaso**
[GitHub](https://github.com/andrewSantanastaso) · [LinkedIn](https://www.linkedin.com/in/andrewsantanastaso/)
