"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/TextInput"
import { Center } from "@repo/ui/Center"
import { useState } from "react"
import { p2ptransfer } from "../app/lib/actions/p2ptransfer"
import { Send, User, IndianRupee, Check, X, Loader2, Phone } from "lucide-react"

export const SendCard = () => {
  const [amount, setAmount] = useState("")
  const [number, setNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Quick amount options
  const quickAmounts = [100, 500, 1000, 2000, 5000]

  // Recent contacts (mock data - replace with actual data)
  const recentContacts = [
    { name: "John Doe", number: "9876543210" },
    { name: "Jane Smith", number: "8765432109" },
    { name: "Mike Johnson", number: "7654321098" },
  ]

  const validateInputs = () => {
    if (!number.trim()) {
      setError("Phone number is required")
      return false
    }
    if (!/^\d{10}$/.test(number.trim())) {
      setError("Please enter a valid 10-digit phone number")
      return false
    }
    if (!amount.trim()) {
      setError("Amount is required")
      return false
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return false
    }
    if (Number(amount) < 1) {
      setError("Minimum amount is ₹1")
      return false
    }
    if (Number(amount) > 100000) {
      setError("Maximum amount is ₹1,00,000")
      return false
    }
    return true
  }

  const handleSend = async () => {
    setError("")
    setSuccess(false)

    if (!validateInputs()) return

    setIsLoading(true)
    try {
      await p2ptransfer(Number(amount) * 100, number)
      setSuccess(true)
      setAmount("")
      setNumber("")

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Transfer failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
  }

  const handleContactSelect = (contact: { name: string; number: string }) => {
    setNumber(contact.number)
  }

  const formatAmount = (value: string) => {
    const numValue = value.replace(/[^\d]/g, "")
    if (numValue) {
      return Number(numValue).toLocaleString("en-IN")
    }
    return ""
  }

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send Money">
          <div className="min-w-96 pt-2 space-y-6">
            {/* Success Message */}
            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Money sent successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <X className="h-5 w-5 text-red-600" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            {/* Recent Contacts */}
            

            {/* Phone Number Input */}
            <div className="relative">
              <TextInput
                placeholder="Enter 10-digit phone number"
                label="Phone Number"
                onChange={(value) => {
                  setNumber(value.replace(/[^\d]/g, "").slice(0, 10))
                  setError("")
                }}
              />
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Quick Amount</label>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleQuickAmount(quickAmount)}
                    className="p-2 text-sm border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    ₹{quickAmount.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="relative">
              <TextInput
                placeholder="Enter amount"
                label="Amount"
                onChange={(value) => {
                  const numericValue = value.replace(/[^\d]/g, "")
                  setAmount(numericValue)
                  setError("")
                }}
              />
              <IndianRupee className="absolute right-3 top-9 h-4 w-4 text-gray-400" />
              {amount && <div className="text-xs text-gray-500 mt-1">₹{formatAmount(amount)}</div>}
            </div>

            {/* Transaction Summary */}
            {amount && number && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Transaction Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">+91 {number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{formatAmount(amount)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pt-1 border-t">
                    <span>Transaction Fee:</span>
                    <span>Free</span>
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <div className="pt-2">
              <Button
               onClick={async () => {
                            await p2ptransfer( Number(amount) * 100, number,)
                        }}
               className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Money</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Security Note */}
            <div className="text-xs text-gray-500 text-center">
              🔒 Your transaction is secured 
            </div>
          </div>
        </Card>
      </Center>
    </div>
)
}
