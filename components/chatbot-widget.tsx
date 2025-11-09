"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle, Minimize2, Maximize2, ArrowUpRight } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 👋 I'm Shivanshu's AI assistant. I can help you learn about his projects, technical skills, work experience, and educational background. Feel free to ask me anything!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showArrow, setShowArrow] = useState(true)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setShowArrow(false)
    }
  }, [isOpen])

  // Smart auto-scroll: only for single bubble responses
  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, shouldAutoScroll])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    try {
      // Call Next.js API route which connects to Python backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Split response by markdown headers or double line breaks for multiple bubbles
      const responseText = data.message || "Sorry, I couldn't process that. Try again!"
      const sections = responseText.split(/(?=## )|(?=\n\n\*\*)/)
        .filter((section: string) => section.trim().length > 0)
      
      // Enable auto-scroll only for single bubble responses
      if (sections.length === 1) {
        setShouldAutoScroll(true)
      } else {
        setShouldAutoScroll(false)
      }
      
      // Add messages with delay for natural conversation flow
      sections.forEach((section: string, idx: number) => {
        setTimeout(() => {
          const botMessage: Message = {
            id: `${Date.now()}_${idx}`,
            text: section.trim(),
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
        }, idx * 300) // 300ms delay between each bubble
      })
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong. Please make sure the backend server is running. 🔧",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed top-6 bottom-6 right-6 z-40 flex flex-col justify-end">
      {showArrow && !isOpen && (
        <div className="absolute bottom-24 right-0 animate-pulse">
          <div className="relative">
            {/* Arrow lines */}
            <div className="absolute bottom-2 right-2 animate-arrow-bounce">
              <ArrowUpRight className="w-5 h-5 text-cyan-400" strokeWidth={3} />
            </div>
            {/* Text label */}
            <div className="absolute bottom-8 right-0 whitespace-nowrap">
              <div
                className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                Talk to me! 😄
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-lg animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-300 ease-out transform origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-[420px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-slate-700/50 transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[calc(100vh-120px)] max-h-[800px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className={`transition-all duration-300 ${isMinimized ? "hidden" : "block"}`}>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-blue-100 text-xs">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-white" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <div
              className={`flex flex-col h-[calc(100%-128px)] bg-slate-800/50 overflow-y-auto transition-all duration-300`}
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`${message.sender === "user" ? "max-w-xs" : "max-w-full"} px-5 py-4 rounded-lg text-sm transition-all duration-300 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-lg animate-message-slide-in-right"
                          : "bg-slate-700/70 text-slate-100 rounded-bl-none shadow-md animate-message-slide-in-left backdrop-blur-sm"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {message.sender === "bot" ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2 text-cyan-300" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="text-base font-semibold mb-2 text-cyan-400" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mb-1 text-cyan-400" {...props} />,
                              p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1.5 ml-2" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1.5 ml-2" {...props} />,
                              li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-semibold text-cyan-300" {...props} />,
                              code: ({ node, ...props }) => <code className="bg-slate-800/50 px-1 py-0.5 rounded text-cyan-300" {...props} />,
                              blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-cyan-400 pl-3 italic" {...props} />,
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg rounded-bl-none shadow-md animate-message-slide-in-left">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-700/50 p-4 bg-gradient-to-t from-slate-900 to-transparent">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (isMinimized) setIsMinimized(false)
        }}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center relative group animate-pulse`}
      >
        <MessageCircle className="w-6 h-6" />

        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse-glow" />

        {/* Secondary pulse for extra effect */}
        <div className="absolute inset-2 rounded-full border border-cyan-300/30 group-hover:animate-pulse" />

        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          Chat with AI
        </span>
      </button>
    </div>
  )
}
