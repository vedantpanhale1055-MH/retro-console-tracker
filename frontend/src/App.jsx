import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, AlertCircle, Calendar } from 'lucide-react';

// Sample data - in production, this would come from your database
const generateHistoricalData = () => {
  const consoles = ['Nintendo 64', 'PlayStation 1', 'Sega Genesis', 'Super Nintendo', 'GameCube'];
  const data = [];
  
  for (let i = 0; i < 12; i++) {
    const month = new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' });
    const entry = { month };
    
    consoles.forEach(console => {
      const basePrice = {
        'Nintendo 64': 80,
        'PlayStation 1': 60,
        'Sega Genesis': 50,
        'Super Nintendo': 120,
        'GameCube': 90
      }[console];
      
      const trend = Math.sin(i / 3) * 15;
      const noise = (Math.random() - 0.5) * 10;
      entry[console] = Math.round(basePrice + trend + noise);
    });
    
    data.push(entry);
  }
  
  return data;
};

const recentListings = [
  { id: 1, console: 'Nintendo 64', condition: 'Loose', price: 75, avgPrice: 82, platform: 'eBay', daysAgo: 2, status: 'available' },
  { id: 2, console: 'PlayStation 1', condition: 'CIB', price: 95, avgPrice: 110, platform: 'r/GameSale', daysAgo: 1, status: 'available' },
  { id: 3, console: 'Super Nintendo', condition: 'Loose', price: 115, avgPrice: 118, platform: 'Mercari', daysAgo: 3, status: 'sold' },
  { id: 4, console: 'Sega Genesis', condition: 'CIB', price: 85, avgPrice: 92, platform: 'eBay', daysAgo: 1, status: 'available' },
  { id: 5, console: 'GameCube', condition: 'Loose', price: 82, avgPrice: 88, platform: 'Facebook', daysAgo: 4, status: 'available' },
  { id: 6, console: 'Nintendo 64', condition: 'CIB', price: 180, avgPrice: 195, platform: 'eBay', daysAgo: 2, status: 'available' },
];

const marketShare = [
  { name: 'eBay', value: 45, color: '#3b82f6' },
  { name: 'r/GameSale', value: 20, color: '#10b981' },
  { name: 'Mercari', value: 15, color: '#8b5cf6' },
  { name: 'Facebook', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 8, color: '#6b7280' },
];

const consoleStats = [
  { console: 'Nintendo 64', avgPrice: 82, listings: 143, trend: 8.2, velocity: 4.5 },
  { console: 'PlayStation 1', avgPrice: 65, listings: 198, trend: -3.1, velocity: 3.2 },
  { console: 'Super Nintendo', avgPrice: 118, listings: 87, trend: 12.5, velocity: 6.1 },
  { console: 'Sega Genesis', avgPrice: 52, listings: 156, trend: -1.8, velocity: 5.8 },
  { console: 'GameCube', avgPrice: 88, listings: 121, trend: 15.3, velocity: 4.9 },
];

const RetroConsoleTrendTracker = () => {
  const [selectedConsole, setSelectedConsole] = useState('Nintendo 64');
  const [timeframe, setTimeframe] = useState('12m');
  const [priceFilter, setPriceFilter] = useState('all');
  
  const historicalData = useMemo(() => generateHistoricalData(), []);
  
  const filteredListings = useMemo(() => {
    return recentListings.filter(listing => {
      const priceDiff = ((listing.price - listing.avgPrice) / listing.avgPrice) * 100;
      if (priceFilter === 'deals') return priceDiff < -10;
      if (priceFilter === 'overpriced') return priceDiff > 10;
      return true;
    });
  }, [priceFilter]);
  
  const selectedStats = consoleStats.find(c => c.console === selectedConsole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Package className="w-10 h-10 text-purple-400" />
            Retro Console Trend Tracker
          </h1>
          <p className="text-gray-300">Real-time market analysis for retro gaming consoles across multiple platforms</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Active Listings</span>
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">705</div>
            <div className="text-green-400 text-sm mt-1">+12% vs last week</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Avg Price (Loose)</span>
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">$81</div>
            <div className="text-yellow-400 text-sm mt-1">+5.2% this month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Hot Deals</span>
              <TrendingDown className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">23</div>
            <div className="text-purple-400 text-sm mt-1">15%+ below market</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Avg Days to Sell</span>
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white">4.9</div>
            <div className="text-red-400 text-sm mt-1">-0.8 days vs avg</div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Price Trends */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Price Trends (Loose Condition)</h2>
              <select 
                className="bg-white/20 text-white rounded px-3 py-1 text-sm border border-white/30"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="12m">12 Months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Nintendo 64" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="PlayStation 1" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="Super Nintendo" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="GameCube" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Listings by Platform</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShare}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Console Stats Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Console Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-3 text-gray-300 font-semibold">Console</th>
                  <th className="pb-3 text-gray-300 font-semibold">Avg Price</th>
                  <th className="pb-3 text-gray-300 font-semibold">Active Listings</th>
                  <th className="pb-3 text-gray-300 font-semibold">30d Trend</th>
                  <th className="pb-3 text-gray-300 font-semibold">Avg Days to Sell</th>
                </tr>
              </thead>
              <tbody>
                {consoleStats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="py-3 text-white font-medium">{stat.console}</td>
                    <td className="py-3 text-white">${stat.avgPrice}</td>
                    <td className="py-3 text-gray-300">{stat.listings}</td>
                    <td className="py-3">
                      <span className={`flex items-center gap-1 ${stat.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(stat.trend)}%
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">{stat.velocity} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Listings / Deals */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Listings</h2>
            <select 
              className="bg-white/20 text-white rounded px-3 py-1 text-sm border border-white/30"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Listings</option>
              <option value="deals">Hot Deals Only</option>
              <option value="overpriced">Overpriced</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {filteredListings.map((listing) => {
              const priceDiff = ((listing.price - listing.avgPrice) / listing.avgPrice) * 100;
              const isDeal = priceDiff < -10;
              const isOverpriced = priceDiff > 10;
              
              return (
                <div key={listing.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-semibold">{listing.console}</h3>
                        <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">
                          {listing.condition}
                        </span>
                        <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">
                          {listing.platform}
                        </span>
                        {listing.status === 'sold' && (
                          <span className="text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded">
                            SOLD
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>Posted {listing.daysAgo}d ago</span>
                        <span>Market avg: ${listing.avgPrice}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">${listing.price}</div>
                      <div className={`text-sm font-semibold ${isDeal ? 'text-green-400' : isOverpriced ? 'text-red-400' : 'text-gray-400'}`}>
                        {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(1)}% vs avg
                      </div>
                    </div>
                  </div>
                  
                  {isDeal && (
                    <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-semibold">Hot Deal! ${Math.abs(listing.price - listing.avgPrice)} below market</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Data updated every 6 hours • Tracking 700+ listings across eBay, r/GameSale, Mercari, Facebook Marketplace</p>
        </div>
      </div>
    </div>
  );
};

export default RetroConsoleTrendTracker;
