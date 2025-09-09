"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { MessageCircle, Bot, User, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

type ConversationState =
  | "initial"
  | "awaitingTitle"
  | "awaitingDescription"
  | "awaitingLocation"
  | "awaitingImages"
  | "awaitingSubmission"
  | "awaitingTrackingId"
  | "awaitingFaqChoice"

interface ReportData {
  title?: string
  description?: string
  location?: string
  hasImages?: boolean
}

export const ChatbotInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [conversationState, setConversationState] = useState<ConversationState>("initial")
  const [reportData, setReportData] = useState<ReportData>({})
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial greeting
    addBotMessage(
      "Hello! I'm your civic assistant. How can I help you today? You can say 'Report Issue', 'Check Report Status', or 'FAQs'.",
    )
  }, [])

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userInput = inputValue.trim()
    addUserMessage(userInput)
    setInputValue("")

    // Process user input based on current state
    setTimeout(() => {
      processUserInput(userInput)
    }, 500)
  }

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase()

    switch (conversationState) {
      case "initial":
        if (lowerInput.includes("report issue")) {
          setConversationState("awaitingTitle")
          addBotMessage("Great! Let's report an issue. What is the title of the issue?")
        } else if (lowerInput.includes("check report status")) {
          setConversationState("awaitingTrackingId")
          addBotMessage("Please provide your report tracking ID.")
        } else if (lowerInput.includes("faqs")) {
          setConversationState("awaitingFaqChoice")
          addBotMessage(
            "Here are some common questions:\n1. How long does it take to resolve an issue?\n2. What types of issues can I report?\n\nPlease type '1' or '2' to get more information.",
          )
        } else {
          addBotMessage(
            "I'm sorry, I don't understand. Please choose from 'Report Issue', 'Check Report Status', or 'FAQs'.",
          )
        }
        break

      case "awaitingTitle":
        setReportData((prev) => ({ ...prev, title: input }))
        setConversationState("awaitingDescription")
        addBotMessage("Thanks. Please describe the issue in more detail.")
        break

      case "awaitingDescription":
        setReportData((prev) => ({ ...prev, description: input }))
        setConversationState("awaitingLocation")
        addBotMessage(
          "Can you provide the exact location of the issue? (You can type 'My current location' if you want to use your current location)",
        )
        break

      case "awaitingLocation":
        setReportData((prev) => ({ ...prev, location: input }))
        setConversationState("awaitingImages")
        addBotMessage("Do you have any images for this issue? Please type 'Yes' or 'No'.")
        break

      case "awaitingImages":
        const hasImages = lowerInput.includes("yes")
        setReportData((prev) => ({ ...prev, hasImages }))
        setConversationState("awaitingSubmission")
        if (hasImages) {
          addBotMessage(
            "Great! Your report is ready with images. Would you like to submit it? Type 'Yes' to submit or 'No' to cancel.",
          )
        } else {
          addBotMessage(
            "Thank you. Your report is ready. Would you like to submit it? Type 'Yes' to submit or 'No' to cancel.",
          )
        }
        break

      case "awaitingSubmission":
        if (lowerInput.includes("yes")) {
          const trackingId = `CIV${Date.now().toString().slice(-6)}`
          addBotMessage(
            `Report submitted successfully! Your tracking ID is ${trackingId}. You can use this ID to check your report status anytime.`,
          )
          resetConversation()
        } else {
          addBotMessage("Report cancelled. Is there anything else I can help you with?")
          resetConversation()
        }
        break

      case "awaitingTrackingId":
        const dummyStatuses = ["In Progress", "Under Review", "Assigned to Officer", "Resolved"]
        const randomStatus = dummyStatuses[Math.floor(Math.random() * dummyStatuses.length)]
        addBotMessage(`Report ${input} is currently '${randomStatus}'. You will be notified of any updates.`)
        resetConversation()
        break

      case "awaitingFaqChoice":
        if (input === "1") {
          addBotMessage(
            "Typically, issues are resolved within 3-7 business days depending on the complexity and type of issue. Emergency issues are prioritized and handled within 24 hours.",
          )
        } else if (input === "2") {
          addBotMessage(
            "You can report various civic issues including: road damage, streetlight problems, water supply issues, garbage collection problems, park maintenance, and other municipal concerns.",
          )
        } else {
          addBotMessage("Please type '1' for resolution time information or '2' for types of issues you can report.")
          return
        }
        resetConversation()
        break

      default:
        addBotMessage("I'm sorry, something went wrong. Let's start over. How can I help you today?")
        resetConversation()
    }
  }

  const resetConversation = () => {
    setConversationState("initial")
    setReportData({})
    setTimeout(() => {
      addBotMessage(
        "Is there anything else I can help you with? You can say 'Report Issue', 'Check Report Status', or 'FAQs'.",
      )
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-80 sm:h-96 md:h-[500px]">
      <Card className="h-full flex flex-col shadow-xl border-2">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Civic Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-8 w-8 p-0">
              <span className="text-lg">−</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm ${
                    message.isBot ? "bg-gray-100 text-gray-900 border border-gray-200" : "bg-blue-600 text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />}
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</div>
                    {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4 flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="px-3 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatbotInterface
