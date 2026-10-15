import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Shield,
  Send,
  Radio,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  Info
} from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'assistant',
    text: `Hello, I am **DisasterShield AI Assistant**. 

I provide clear, life-saving guidance on flood safety, emergency kit preparation, water purification, and evacuation precautions.

*Important:* In active life-threatening emergencies, immediately call **112** (National Emergency Helpline) or **1070** (State Disaster Management).

Select a quick question below or type your emergency inquiry:`,
    timestamp: 'Just now'
  }
];

const QUICK_PROMPTS = [
  'What should I pack in a 72-hour flood emergency kit?',
  'Floodwater is entering my home right now. What should I do?',
  'How can I purify drinking water during a flood?',
  'Is it safe to drive my car through 6 inches of water?',
  'What should I do on the roof while waiting for a rescue boat?',
  'How do I safely handle electricity and gas during a flood?'
];

export const AiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Emergency assistant service is currently unavailable.');
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error('AI chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'The AI service encountered a temporary network delay. Please call **112** for live emergency support, or consult the pre-loaded **Safety Guide** tab above.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
      {/* Page Header */}
      <div className="border-b border-[#303843]/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#E8E1F4] text-[#4A3B69] text-xs font-semibold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>AI Emergency Flood Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#303843]">
            Emergency Preparedness &amp; Safety Guidance
          </h1>
          <p className="text-xs sm:text-sm text-[#303843]/70 mt-1">
            Instant, calm answers powered by AI for flood preparedness, survival kits, and home safety procedures.
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs text-[#303843]/70 hover:text-[#303843] flex items-center gap-1 self-start sm:self-auto py-1 px-2.5 rounded-lg border border-[#303843]/10 hover:bg-[#FAF9F6] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#303843]/80">
        <Info className="w-4 h-4 text-[#2A4D69] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Official Alert Disclaimer:</strong> DisasterShield AI Assistant provides verified general safety instructions. In dynamic flash flood events, official directives from local district administration, Police, and NDRF always supersede general advice.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-[#FAF9F6] border border-[#303843]/12 rounded-3xl overflow-hidden shadow-xs flex flex-col h-[540px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                    isUser
                      ? 'bg-[#303843] text-white'
                      : 'bg-[#E8E1F4] text-[#4A3B69] border border-[#303843]/10'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-[#DCEAF7] text-[#303843] font-medium'
                      : msg.isError
                      ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#EF4444]/20'
                      : 'bg-[#FAF9F6] border border-[#303843]/10 text-[#303843]'
                  }`}
                >
                  {/* Formatted body */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={pIdx} className="font-bold text-sm text-[#2A4D69] pt-1">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      return (
                        <p key={pIdx} className="leading-relaxed">
                          {paragraph.split('**').map((chunk, cIdx) =>
                            cIdx % 2 === 1 ? (
                              <strong key={cIdx} className="font-bold text-[#303843]">
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          )}
                        </p>
                      );
                    })}
                  </div>

                  <span className="text-[10px] text-[#303843]/50 block text-right pt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-[#E8E1F4] text-[#4A3B69] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl p-4 bg-[#FAF9F6] border border-[#303843]/10 text-xs text-[#303843]/70 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2A4D69] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#2A4D69] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#2A4D69] animate-bounce [animation-delay:0.4s]" />
                <span>Formulating safety instructions...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Strip */}
        <div className="px-4 py-2.5 bg-[#FAF9F6] border-t border-[#303843]/8 overflow-x-auto flex gap-2 no-scrollbar">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-[#303843]/15 text-[#303843] hover:bg-[#DCEAF7]/50 hover:border-[#2A4D69]/30 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-[#FAF9F6] border-t border-[#303843]/10 flex gap-2 items-center"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Type your flood question (e.g. survival kit, water safety, electricity)..."
            className="flex-1 px-4 py-2.5 text-xs bg-[#FAF9F6] border border-[#303843]/15 rounded-xl text-[#303843] focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30 placeholder-[#303843]/50"
          />

          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#2A4D69] hover:bg-[#1E374B] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
};
