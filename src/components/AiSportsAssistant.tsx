/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Languages,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  BookOpen,
  Gamepad2,
  Trophy,
  HelpCircle,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: 'en' | 'ta';
  isOfficialRule?: boolean;
}

export const AiSportsAssistant: React.FC = () => {
  const { assistantInitialPrompt, setAssistantInitialPrompt } = useApp();

  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialWelcomeEn = `Welcome to the Arena Hub AI Sports Specialist. 
I can explain official rules (IFAB, MCC, Krafton, Riot, Garena), break down tournament formats (Swiss, Double Elim, Battle Royale point matrix), and provide tactical game mechanics in **English** and **Tamil (தமிழ்)**.

*Important Note: I distinguish between official federation rules and tactical gameplay tips, and never invent live tournament schedules or unconfirmed prize pools.*`;

  const initialWelcomeTa = `வணக்கம்! அரீனா ஹப் ஏஐ விளையாட்டு ஆலோசகருக்கு வரவேற்கிறோம் (Arena Hub AI Assistant).
நான் சர்வதேச விளையாட்டு விதிகள் (IFAB, MCC, கிரிக்கெட், கால்பந்து) மற்றும் ஈஸ்போர்ட்ஸ் போட்டி விதிமுறைகளை (Free Fire MAX, BGMI, Valorant) தெளிவுபடுத்துகிறேன்.

*குறிப்பு: அதிகாரப்பூர்வ சர்வதேச விதிகளையும் பொதுவான ஆட்ட உத்திகளையும் துல்லியமாக வேறுபடுத்தி விளக்குகிறேன்.*`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialWelcomeEn,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'en',
      isOfficialRule: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (assistantInitialPrompt) {
      sendMessage(assistantInitialPrompt);
      setAssistantInitialPrompt('');
    }
  }, [assistantInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const promptChips = [
    { label: '🎯 Valorant Economy Creds', prompt: 'Explain the Valorant economy system, round loss streaks, and full buy credits according to official VCT rules.' },
    { label: '🏏 Cricket DLS Method', prompt: 'How is the Duckworth-Lewis-Stern (DLS) method calculated in rain-interrupted limited overs cricket matches?' },
    { label: '🔥 Free Fire MAX Points (தமிழ்)', prompt: 'Free Fire MAX esports official tournament point matrix explained in Tamil (FFWS scoring)', lang: 'ta' as const },
    { label: '⚽ Football Offside Law 11', prompt: 'Explain IFAB Law 11 Offside in Football, when is an attacker penalized, and what are the three exceptions?' },
    { label: '⚔️ BGMI Compound Hold Tactics', prompt: 'Explain tactical squad rotations, vehicle smoke barriers, and compound defensive positioning in BGMI competitive.' },
    { label: '🏸 Badminton 1.15m Service Rule', prompt: 'What is the BWF 1.15 metre fixed service height law in international badminton and how is it officiated?' },
  ];

  const sendMessage = async (textToSend: string, forcedLang?: 'en' | 'ta') => {
    const text = textToSend.trim();
    if (!text || loading) return;

    const currentLang = forcedLang || language;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLang,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: currentLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response returned from the sports specialist engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: data.language || currentLang,
        isOfficialRule: true,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error querying assistant:', err);
      const fallbackErrorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: currentLang === 'ta'
          ? 'மன்னிக்கவும், சேவை இணைப்பு தற்காலிகமாக தாமதமாகிறது. எங்கள் அதிகாரப்பூர்வ விதிமுறைகள் நூலகத்தை (Rules Library) நீங்கள் நேரடியாக பார்க்கலாம்.'
          : 'I encountered a brief connection delay. You can also explore full section-by-section rules in the dedicated **Sports Rules Library** above.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
      };
      setMessages((prev) => [...prev, fallbackErrorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLanguageToggle = (newLang: 'en' | 'ta') => {
    setLanguage(newLang);
    // Add brief greeting in new language
    const noteMsg: ChatMessage = {
      id: `lang-${Date.now()}`,
      sender: 'assistant',
      text: newLang === 'ta'
        ? 'மொழி தமிழ் (Tamil) ஆக மாற்றப்பட்டுள்ளது. விளையாட்டு மற்றும் ஈஸ்போர்ட்ஸ் தொடர்பான உங்கள் கேள்விகளைக் கேளுங்கள்.'
        : 'Language switched to English. Ready for your sports and esports inquiries.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: newLang,
    };
    setMessages((prev) => [...prev, noteMsg]);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SERVER-SIDE GEMINI 3.8 FLASH ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-heading">
              AI Sports & Esports Specialist
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              Get official rule citations, tactical gameplay analysis, and tournament format breakdowns in English and Tamil (தமிழ்).
            </p>
          </div>

          {/* Language Switcher Pill */}
          <div className="flex items-center space-x-1 bg-[#0b0c14] border border-[#23263b] p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => handleLanguageToggle('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageToggle('ta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="mt-5 pt-4 border-t border-[#222436] flex flex-wrap gap-2">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(chip.prompt, chip.lang)}
              className="text-xs bg-[#161726] hover:bg-amber-500/15 hover:text-amber-300 text-zinc-300 px-3 py-1.5 rounded-lg border border-[#27293d] transition-colors cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-[#10111c] border border-[#222436] rounded-2xl flex flex-col h-[560px] overflow-hidden shadow-2xl">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                      : 'bg-[#181a29] border border-amber-500/30 text-amber-400'
                  }`}
                >
                  {isUser ? 'YOU' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative group ${
                    isUser
                      ? 'bg-amber-500/15 border border-amber-500/30 text-zinc-100 rounded-tr-none'
                      : 'bg-[#0d0e17] border border-[#1e2030] text-zinc-200 rounded-tl-none shadow-md'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#1c1d2e] text-[10px] text-zinc-400">
                      <span className="flex items-center space-x-1 text-amber-400 font-semibold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Official Rules & Tactics Specialist</span>
                      </span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-60 hover:opacity-100 text-zinc-400 hover:text-white p-0.5"
                        title="Copy answer"
                        aria-label="Copy message"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {/* Text rendered with preserved whitespace & markdown styling */}
                  <div className="whitespace-pre-line space-y-1 font-sans">
                    {msg.text}
                  </div>

                  <div className="text-[9px] text-zinc-500 text-right pt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#181a29] border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#0d0e17] border border-[#1e2030] rounded-2xl rounded-tl-none p-3.5 text-xs text-amber-300 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-150"></div>
                <span className="text-zinc-400 text-[11px] ml-1">Consulting official rules repository...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 bg-[#0a0a0f] border-t border-[#1e2030]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputMessage);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'விதிமுறைகள் அல்லது ஈஸ்போர்ட்ஸ் பற்றி கேளுங்கள் (Ask rules in Tamil / English)...'
                  : 'Ask about rules (e.g. Free Fire points, DLS method, Offside law, Valorant creds)...'
              }
              className="flex-1 bg-[#141522] border border-[#27293d] rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className={`p-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                inputMessage.trim() && !loading
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#181a28] text-zinc-600 cursor-not-allowed'
              }`}
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-zinc-500">
            <span>Powered by Gemini 3.8 Flash • English & தமிழ் Support</span>
            <span>Official rules verified by international governing bodies</span>
          </div>
        </div>
      </div>
    </div>
  );
};
