"use client";

import { useState, useEffect } from "react";
import { signOut } from "@/lib/auth";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Interface for analytics data
interface AnalyticsDataPoint {
  day?: string;
  week?: string;
  month?: string;
  users: number;
}

interface CountryDataPoint {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface Session {
  userId: string;
  name: string;
  email?: string;
  user?: {
    name?: string;
    email?: string;
  };
}

const COLORS = ["#00f0ff", "#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface DashboardClientProps {
  initialSession: Session;
}

export default function DashboardClient({ initialSession }: DashboardClientProps) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDataPoint[]>([]);
  const [countryData, setCountryData] = useState<CountryDataPoint[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    dailyActive: 0,
    weeklyActive: 0,
    monthlyActive: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch analytics stats
        const statsResponse = await fetch('/api/analytics/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch time-based analytics
        const timeResponse = await fetch(`/api/analytics/time?range=${timeRange}`);
        if (timeResponse.ok) {
          const timeData = await timeResponse.json();
          setAnalyticsData(timeData);
        }

        // Fetch country analytics
        const countryResponse = await fetch('/api/analytics/countries');
        if (countryResponse.ok) {
          const countryData = await countryResponse.json();
          setCountryData(countryData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-muted">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-text-muted mt-2">Welcome back, {session?.user?.email || session?.user?.name || session?.name || 'User'}!</p>
          </div>
          <AnimatedButton variant="outline" onClick={handleLogout}>
            Logout
          </AnimatedButton>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatedCard variant="primary" className="p-6">
            <h3 className="text-text-muted text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.totalUsers.toLocaleString()}</p>
          </AnimatedCard>

          <AnimatedCard variant="secondary" className="p-6">
            <h3 className="text-text-muted text-sm font-medium">Daily Active</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.dailyActive}</p>
          </AnimatedCard>

          <AnimatedCard variant="accent" className="p-6">
            <h3 className="text-text-muted text-sm font-medium">Weekly Active</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.weeklyActive}</p>
          </AnimatedCard>

          <AnimatedCard className="p-6">
            <h3 className="text-text-muted text-sm font-medium">Monthly Active</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.monthlyActive}</p>
          </AnimatedCard>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          <AnimatedButton
            variant={timeRange === "daily" ? "primary" : "outline"}
            onClick={() => setTimeRange("daily")}
          >
            Daily
          </AnimatedButton>
          <AnimatedButton
            variant={timeRange === "weekly" ? "primary" : "outline"}
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </AnimatedButton>
          <AnimatedButton
            variant={timeRange === "monthly" ? "primary" : "outline"}
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </AnimatedButton>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Activity Chart */}
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} User Activity
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey={timeRange === "daily" ? "day" : timeRange === "weekly" ? "week" : "month"}
                    stroke="#8888a0"
                  />
                  <YAxis stroke="#8888a0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f18',
                      borderColor: '#1e1e3a',
                      borderRadius: '0.5rem',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="users" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>

          {/* Geographic Distribution Chart */}
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Geographic Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f18',
                      borderColor: '#1e1e3a',
                      borderRadius: '0.5rem',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Countries */}
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Countries</h3>
            <div className="space-y-3">
              {countryData.map((country, index) => (
                <div key={country.name} className="flex justify-between items-center">
                  <span className="text-text-muted">{country.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface-light rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${country.value}%` }}
                      ></div>
                    </div>
                    <span className="text-foreground font-medium">{country.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Recent Activity */}
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                  <div>
                    <p className="text-foreground font-medium">User registered</p>
                    <p className="text-xs text-text-muted">From {countryData[item % countryData.length]?.name || 'United States'}</p>
                  </div>
                  <span className="text-xs text-text-muted">2 mins ago</span>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}