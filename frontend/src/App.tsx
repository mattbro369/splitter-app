import { useState } from "react";
import "./App.css";
import {
  Plus,
  Users,
  CreditCard,
  Bell,
  Settings,
  ArrowUp,
  ArrowDown,
  Receipt,
  User,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Send,
  MoreHorizontal,
} from "lucide-react";

interface DashboardStats {
  totalBalance: number;
  youOwe: number;
  owedToYou: number;
  monthlySpending: number;
  activeGroups: number;
  pendingSplits: number;
}

interface Activity {
  id: number;
  type: "payment_received" | "new_split" | "reminder_sent" | "settlement";
  title: string;
  amount: number;
  date: string;
  avatar: string;
  status: "completed" | "pending";
  members?: number;
}

interface UpcomingPayment {
  name: string;
  amount: number;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

type TimePeriod = "week" | "month" | "year";

export default function PaymentSplitMainDashboard(): JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const dashboardStats: DashboardStats = {
    totalBalance: 142.5,
    youOwe: 68.7,
    owedToYou: 211.2,
    monthlySpending: 1247.8,
    activeGroups: 8,
    pendingSplits: 5,
  };

  const recentActivity: Activity[] = [
    {
      id: 1,
      type: "payment_received",
      title: "Alex paid you",
      amount: 45.2,
      date: "2 hours ago",
      avatar: "AM",
      status: "completed",
    },
    {
      id: 2,
      type: "new_split",
      title: "Dinner at Mario's",
      amount: 124.5,
      date: "4 hours ago",
      avatar: "🍝",
      status: "pending",
      members: 4,
    },
    {
      id: 3,
      type: "reminder_sent",
      title: "Reminded Sarah about Concert Tickets",
      amount: 29.99,
      date: "1 day ago",
      avatar: "SK",
      status: "pending",
    },
    {
      id: 4,
      type: "settlement",
      title: "Settled up with Mike",
      amount: 67.8,
      date: "2 days ago",
      avatar: "MR",
      status: "completed",
    },
  ];

  const upcomingPayments: UpcomingPayment[] = [
    { name: "Sarah K.", amount: 23.5, dueDate: "Today", priority: "high" },
    { name: "Emma W.", amount: 45.2, dueDate: "Tomorrow", priority: "medium" },
    { name: "James C.", amount: 12.75, dueDate: "In 3 days", priority: "low" },
  ];

  const topCategories: SpendingCategory[] = [
    {
      category: "Food & Drink",
      amount: 456.3,
      percentage: 37,
      color: "bg-blue-500",
    },
    {
      category: "Transport",
      amount: 234.8,
      percentage: 19,
      color: "bg-green-500",
    },
    {
      category: "Entertainment",
      amount: 189.4,
      percentage: 15,
      color: "bg-purple-500",
    },
    {
      category: "Shopping",
      amount: 167.2,
      percentage: 14,
      color: "bg-yellow-500",
    },
    { category: "Other", amount: 200.1, percentage: 15, color: "bg-gray-500" },
  ];

  const handlePeriodChange = (period: TimePeriod): void => {
    setSelectedPeriod(period);
  };

  const toggleNotifications = (): void => {
    setShowNotifications(!showNotifications);
  };

  const getPriorityColor = (priority: UpcomingPayment["priority"]): string => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getActivityAmountColor = (type: Activity["type"]): string => {
    switch (type) {
      case "payment_received":
        return "text-green-600";
      case "new_split":
        return "text-gray-900";
      default:
        return "text-gray-600";
    }
  };

  const formatAmount = (amount: number): string => {
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-indigo-600">SplitPay</h1>
            <div className="hidden md:flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handlePeriodChange("week")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === "week"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => handlePeriodChange("month")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === "month"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => handlePeriodChange("year")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === "year"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 hover:bg-gray-100 rounded-full relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {/* Net Balance */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Net Balance</h3>
              <DollarSign className="w-5 h-5 opacity-75" />
            </div>
            <div className="text-2xl font-bold mb-1">
              ${formatAmount(dashboardStats.totalBalance)}
            </div>
            <div className="flex items-center text-sm opacity-75">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </div>

          {/* Amount Owed to You */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Owed to You</h3>
              <ArrowUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${formatAmount(dashboardStats.owedToYou)}
            </div>
            <div className="text-sm text-green-600">
              From {upcomingPayments.length} people
            </div>
          </div>

          {/* Amount You Owe */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">You Owe</h3>
              <ArrowDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${formatAmount(dashboardStats.youOwe)}
            </div>
            <div className="text-sm text-red-600">Due soon</div>
          </div>

          {/* Monthly Spending */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Monthly Spending
              </h3>
              <TrendingDown className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${formatAmount(dashboardStats.monthlySpending)}
            </div>
            <div className="text-sm text-gray-500">
              Across {dashboardStats.activeGroups} groups
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                  <Plus className="w-8 h-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium">New Split</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <Users className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Add Friends</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <CreditCard className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Settle Up</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <Receipt className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">View Reports</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.avatar.length > 2 ? (
                            <span className="text-lg">{activity.avatar}</span>
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {activity.avatar}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{activity.date}</span>
                            {activity.members && (
                              <>
                                <span className="mx-2">•</span>
                                <Users className="w-4 h-4 mr-1" />
                                <span>{activity.members} people</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`font-bold ${getActivityAmountColor(
                            activity.type
                          )}`}
                        >
                          {activity.type === "payment_received" ? "+" : ""}$
                          {formatAmount(activity.amount)}
                        </div>
                        <div className="flex items-center justify-end mt-1">
                          {activity.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Categories */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">
                  Spending by Category
                </h3>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`w-3 h-3 rounded-full ${category.color}`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {category.category}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-bold text-gray-900">
                        ${formatAmount(category.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Payments */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">
                  Upcoming Payments
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {upcomingPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {payment.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {payment.name}
                        </div>
                        <div
                          className={`text-xs ${getPriorityColor(
                            payment.priority
                          )}`}
                        >
                          Due {payment.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        ${formatAmount(payment.amount)}
                      </div>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                        Remind
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-indigo-600 text-sm font-medium hover:text-indigo-700">
                  View All Payments
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Groups</span>
                  <span className="font-bold text-gray-900">
                    {dashboardStats.activeGroups}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Splits</span>
                  <span className="font-bold text-yellow-600">
                    {dashboardStats.pendingSplits}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Friends</span>
                  <span className="font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-gray-900">12 splits</span>
                </div>
              </div>
            </div>

            {/* Recent Friends */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Friends</h3>
                <button className="text-indigo-600 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="flex -space-x-2">
                {["AM", "SK", "MR", "EW", "JC"].map((initials, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-indigo-100 border-2 border-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-indigo-600">
                      {initials}
                    </span>
                  </div>
                ))}
                <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">+5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
