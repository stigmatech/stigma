"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface AiAuditChatbotProps {
    contextData: {
        score: number;
        weakness: string;
        company: string;
    };
    dict: any;
}

export function AiAuditChatbot({ contextData, dict }: AiAuditChatbotProps) {
    // @ts-ignore - Vercel AI SDK type definitions mismatch in generic resolution
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        body: { contextData },
        initialMessages: [
            {
                id: 'system-intro',
                role: 'assistant',
                content: `Bonjour ! Je suis l'Agent IA de Stigmatech. J'analyse vos résultats : un score de ${contextData.score}/100 avec une opportunité majeure d'automatisation concernant : **${contextData.weakness}**. \n\nVoulez-vous que je vous génère un exemple concret de flux automatisé pour votre entreprise ?`
            }
        ]
    } as any);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-24 border border-blue-100 rounded-xl overflow-hidden shadow-2xl shadow-blue-50 bg-white flex flex-col h-[500px]">
            {/* Chatbot Header */}
            <div className="bg-blue-600 p-4 text-left flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">Agent de Support Stigmatech</h3>
                    <p className="text-blue-200 text-xs mt-0.5">Analyste IA Contextuel</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {messages.map((m: any) => (
                    <motion.div 
                        key={m.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap ${m.role === 'user' ? 'bg-gray-800 text-white px-5 py-3 rounded-2xl rounded-tr-none' : 'bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm text-gray-700'}`}>
                            {m.content}
                        </div>
                    </motion.div>
                ))}
                
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm text-gray-700 flex items-center space-x-2">
                           <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                           <span className="text-xs text-gray-400 italic">Analyse en cours...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex gap-2 relative">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Posez une question sur l'automatisation de vos processus..."
                        className="flex-1 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-blue-600 rounded-full pl-6 pr-14 text-sm font-medium"
                    />
                    <Button 
                        type="submit" 
                        disabled={isLoading || !input.trim()} 
                        className="absolute right-1 top-1 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center p-0"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
                <p className="text-center text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-widest">
                    Propulsé par Stigmatech AI
                </p>
            </div>
        </div>
    );
}
