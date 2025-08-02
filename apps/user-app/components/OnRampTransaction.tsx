import { Card } from "@repo/ui/card"
import { CheckCircle, XCircle, Clock, ArrowDownLeft } from "lucide-react"

type status = "Success" | "Failed" | "Processing"

export const OnRampTransaction = ({
  transactions,
}: {
  transactions: {
    time: Date
    amount: number
    status: status
    provider: string
  }[]
}) => {
  const getStatusIcon = (status: status) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />
      default:
        return null
    }
  }

  const getStatusColor = (status: status) => {
    switch (status) {
      case "Success":
        return "text-green-600 bg-green-50 border-green-200"
      case "Failed":
        return "text-red-600 bg-red-50 border-red-200"
      case "Processing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
    }
  }

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowDownLeft className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
          <p className="text-gray-500 text-sm">Your recent transactions will appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-3 pt-2">
        {transactions.map((t, index) => (
          <div
            key={t.time.toISOString()}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">Received INR</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{t.provider}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{formatTime(t.time)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">+ ₹{(t.amount / 100).toLocaleString("en-IN")}</div>
                <div
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(t.status)}`}
                >
                  {getStatusIcon(t.status)}
                  <span>{t.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transactions.length > 3 && (
        <div className="pt-4 border-t border-gray-100 mt-4">
          <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors">
            View all transactions
          </button>
        </div>
      )}
    </Card>
  )
}
