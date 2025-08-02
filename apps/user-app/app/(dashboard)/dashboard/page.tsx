"use client"

import { useState } from "react"
import { BalanceCard } from "../../../components/BalanceCard"
import { OnRampTransaction } from "../../../components/OnRampTransaction"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Send,
  Download,
  CreditCard,
  Bell,
  Settings,
  User,
  TrendingUp,
  Users,
  Clock,
  Wallet,
} from "lucide-react"
import { Card } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { redirect, useRouter } from "next/navigation"

// Mock data - replace with actual data from your API
const mockTransactions = [
    {
        time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        amount: 50000, // ₹500 in paise
        status: "Success" as const,
        provider: "HDFC Bank",
    },
    {
        time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        amount: 25000, // ₹250 in paise
        status: "Processing" as const,
        provider: "SBI",
    },
    {
        time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        amount: 100000, // ₹1000 in paise
        status: "Success" as const,
        provider: "ICICI Bank",
    },
]

const mockP2PTransactions = [
    {
        id: 1,
        name: "John Doe",
        amount: -2500,
        type: "sent",
        time: "2h ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "Jane Smith",
        amount: 5000,
        type: "received",
        time: "5h ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "Mike Johnson",
        amount: -1500,
        type: "sent",
        time: "1d ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        name: "Sarah Wilson",
        amount: 7500,
        type: "received",
        time: "2d ago",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export default function Dashboard() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState("overview")
    
    // Mock balance data
    const balance = {
        amount: 125000, // ₹1250 in paise
        locked: 25000, // ₹250 in paise
    }
    
    const QuickActionsCard = () => (
        <Card title="Quick Actions">
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Button onClick={()=>{
          router.push('/p2p')
          }}>
          <Send className="h-6 w-6"  />

          <span className="text-sm font-medium">Send Money</span>
        </Button>
        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
          <Download className="h-6 w-6" />
          <span className="text-sm font-medium">Request Money</span>
        </Button>
        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200">
          <Plus className="h-6 w-6" />
          <span className="text-sm font-medium">Add Money</span>
        </Button>
        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200">
          <CreditCard className="h-6 w-6" />
          <span className="text-sm font-medium">Cards</span>
        </Button>
      </div>
    </Card>
  )

  const P2PTransactionsCard = () => (
    <Card title="Recent P2P Transfers">
      <div className="space-y-3 pt-2">
        {mockP2PTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.name}</p>
                <div className="flex items-center space-x-1">
                  {transaction.type === "sent" ? (
                    <ArrowUpRight className="h-3 w-3 text-red-500" />
                  ) : (
                    <ArrowDownLeft className="h-3 w-3 text-green-500" />
                  )}
                  <span className="text-xs text-gray-500">
                    {transaction.type} • {transaction.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Transfers
        </Button>
      </div>
    </Card>
  )

  const StatsCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
  }: {
    title: string
    value: string
    change: string
    icon: any
    color: string
  }) => (
    <Card>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm ${color} flex items-center mt-1`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {change}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${color === "text-green-600" ? "bg-green-100" : color === "text-blue-600" ? "bg-blue-100" : "bg-purple-100"}`}
          >
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </div>
    </Card>
  )

  const NotificationsCard = () => (
    <Card title="Notifications">
      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
          <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Payment Received</p>
            <p className="text-xs text-blue-700">You received ₹500 from John Doe</p>
            <p className="text-xs text-blue-600 mt-1">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
          <Clock className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">Transaction Complete</p>
            <p className="text-xs text-green-700">Your transfer to Jane Smith was successful</p>
            <p className="text-xs text-green-600 mt-1">1 hour ago</p>
          </div>
        </div>
        <Button variant="outline" className="w-full text-sm bg-transparent">
          View All Notifications
        </Button>
      </div>
    </Card>
  )

  return (
    
    <div className="min-h-screen bg-gray-50 p-4">
        NOTE THIS IS ALL DUMMY IF THE MAIN FUNTIONALITY IS IN P2P AND TRANSFER SECTION 
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button  size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            value="₹1,500.00"
            change="+12.5% from last month"
            icon={Wallet}
            color="text-green-600"
          />
          <StatsCard
            title="This Month Sent"
            value="₹2,450.00"
            change="+8.2% from last month"
            icon={Send}
            color="text-blue-600"
          />
          <StatsCard
            title="This Month Received"
            value="₹3,200.00"
            change="+15.3% from last month"
            icon={Download}
            color="text-purple-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <QuickActionsCard />
            <P2PTransactionsCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <OnRampTransaction transactions={mockTransactions} />
            <NotificationsCard />

            {/* Quick Send Card */}
            <Card title="Quick Send">
              <div className="pt-2">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {["John", "Jane", "Mike"].map((name, index) => (
                    <div
                      key={index}
                      className="text-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <p className="text-xs font-medium">{name}</p>
                    </div>
                  ))}
                </div>
                <Button  size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  View All Contacts
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
