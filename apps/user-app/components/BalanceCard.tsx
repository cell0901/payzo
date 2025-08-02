import { Card } from "@repo/ui/card"
import { Wallet, Lock, Eye, TrendingUp } from "lucide-react"

// dividing the whole money by 100 because we store in paise denomination in the db for better access when working with small digits and some
// safety purposes
export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number
  locked: number
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100)
  }

  const totalBalance = amount + locked
  const unlockedPercentage = totalBalance > 0 ? (amount / totalBalance) * 100 : 0

  return (
    <Card title="Wallet Balance">
      <div className="space-y-4 pt-2">
        {/* Total Balance - Main highlight */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Breakdown */}
        <div className="space-y-3">
          {/* Unlocked Balance */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Available Balance</p>
                <p className="text-xs text-gray-500">Ready to use</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-green-700">{formatCurrency(amount)}</p>
              <p className="text-xs text-green-600">{unlockedPercentage.toFixed(1)}% of total</p>
            </div>
          </div>

          {/* Locked Balance */}
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Lock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Locked Balance</p>
                <p className="text-xs text-gray-500">Pending transactions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-orange-700">{formatCurrency(locked)}</p>
              <p className="text-xs text-orange-600">{(100 - unlockedPercentage).toFixed(1)}% of total</p>
            </div>
          </div>
        </div>

        {/* Balance Visualization */}
        {totalBalance > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Balance Distribution</span>
              <span>{formatCurrency(totalBalance)} total</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="flex h-full">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                  style={{ width: `${unlockedPercentage}%` }}
                ></div>
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${100 - unlockedPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Available
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                Locked
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions or Info */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>💡 Locked funds will be released after transaction completion</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
 