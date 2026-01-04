# 🎮 Retro Console Trend Tracker

> Real-time market analysis for retro gaming consoles across multiple platforms

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📖 Overview

A web application that tracks pricing trends for retro gaming consoles (Nintendo 64, PlayStation 1, Super Nintendo, Sega Genesis, GameCube) across eBay, Reddit, and other marketplaces. Helps collectors identify deals and make informed purchasing decisions.

## 🎯 Problem Statement

Retro gaming collectors face several challenges:
- Waste hours manually checking multiple platforms (eBay, Reddit, Mercari, Facebook)
- Price information is fragmented and inconsistent
- Great deals disappear within hours
- No historical data to validate "fair" prices
- Difficult to track market trends over time

## ✨ Solution

Automated tracker that:
- 📊 Monitors 700+ listings daily across multiple platforms
- 💰 Identifies underpriced items (15%+ below market average)
- 📈 Provides 12 months of historical price trends
- 🔔 Sends real-time deal alerts to users
- 📉 Analyzes market velocity (average days to sell)
- 🏆 Tracks platform distribution and seller reliability

## 🛠 Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Recharts (data visualization)
- Lucide React (icons)

**Backend:**
- Python 3.11
- FastAPI
- PostgreSQL
- BeautifulSoup4 / Scrapy
- PRAW (Reddit API)

**APIs & Data Sources:**
- eBay Finding API
- Reddit API (r/GameSale, r/retrogaming)
- PriceCharting API (optional)

**Deployment:**
- Frontend: Vercel
- Backend: Railway
- Database: Railway PostgreSQL
- Scheduled Jobs: GitHub Actions

## ✅ Features

### Current (MVP)
- [x] Interactive price trend dashboard
- [x] Multi-console comparison charts
- [x] Platform distribution analysis
- [x] Recent listings feed with deal detection
- [x] Responsive design

### In Progress
- [ ] eBay API integration
- [ ] Reddit scraper (r/GameSale)
- [ ] PostgreSQL database setup
- [ ] FastAPI backend
- [ ] Automated data collection (6-hour intervals)

### Planned
- [ ] User authentication
- [ ] Custom price alerts (email/SMS)
- [ ] ML-based price predictions
- [ ] Condition grading assistant (image upload)
- [ ] Geographic price heatmap
- [ ] Seller reputation tracking
- [ ] Mobile app (React Native)

## 📊 Key Metrics (Target)

- **Listings Tracked:** 700+ daily
- **Historical Data:** 12+ months
- **Price Accuracy:** ±5% of actual market
- **Update Frequency:** Every 6 hours
- **Deal Detection Rate:** Flags 15%+ below-market items

## 🏗 Architecture
```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Scrapers  │────────▶│  PostgreSQL  │◀────────│   FastAPI   │
│ (eBay/Reddit)│         │   Database   │         │     API     │
└─────────────┘         └──────────────┘         └──────┬──────┘
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │    React    │
                                                  │  Dashboard  │
                                                  └─────────────┘
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- eBay Developer Account (free)
- Reddit API credentials (free)

### Installation

**Coming soon - currently in development**
```bash
# Clone the repository
git clone https://github.com/vedantpanhale1055-MH/retro-console-tracker.git
cd retro-console-tracker

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development servers
npm run dev  # Frontend (port 3000)
python main.py  # Backend (port 8000)
```

## 📸 Screenshots

*Coming soon - dashboard preview*

## 🎓 What I Learned

- Building production-ready web scrapers with rate limiting
- Time-series data analysis and trend detection
- API design for real-time data delivery
- Creating intuitive data visualizations for niche audiences
- Ethical scraping practices and respecting platform ToS

## 🗺 Roadmap

**Phase 1: Foundation** (Weeks 1-2)
- Set up eBay/Reddit scrapers
- Database schema design
- Initial data collection

**Phase 2: Backend** (Weeks 3-4)
- FastAPI endpoints
- Data processing pipeline
- Trend calculation algorithms

**Phase 3: Frontend** (Weeks 5-6)
- Dashboard implementation
- Real-time updates
- Deal detection UI

**Phase 4: Launch** (Week 7)
- Deployment
- Performance optimization
- Demo video creation

## 📝 License

MIT License - feel free to use this project for learning or your own portfolio!

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Open an issue or reach out.

## 📧 Contact

**Vedant Panhale**
- GitHub: [@vedantpanhale1055-MH](https://github.com/vedantpanhale1055-MH)
- LinkedIn: [Add your LinkedIn]
- Email: [Add your email]
- Portfolio: [Add your portfolio site]

---

⭐ **Star this repo if you find it interesting!**

Built with 🎮 for retro gaming enthusiasts
