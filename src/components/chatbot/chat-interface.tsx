'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CornerDownLeft, CircleSlash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { handleChatMessage } from '@/app/actions';
import EmergencyDialog from '@/components/emergency-dialog';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const quickReplies = [
    "I'm feeling anxious.",
    "I need to talk to someone.",
    "Give me a breathing exercise.",
    "I'm having trouble sleeping.",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm your MannMitra assistant. How are you feeling today? You can talk to me about anything on your mind.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCrisis, setIsCrisis] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>, quickReply?: string) => {
    e?.preventDefault();
    const userMessage = quickReply || input;
    if (!userMessage.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Artificial delay to simulate thinking
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
        const conversationHistory = newMessages.map(m => `${m.role}: ${m.text}`).join('\n');
        const result = await handleChatMessage(userMessage, conversationHistory);
        
        if (result.isCrisis) {
            setIsCrisis(true);
        }

        setMessages((prev) => [...prev, { role: 'bot', text: result.response }]);

    } catch(error) {
        setMessages((prev) => [...prev, { role: 'bot', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSubmit(undefined, reply);
  }

  return (
    <>
      <div className="flex h-full flex-col rounded-xl border bg-card">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4 md:p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'bot' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-[75%] rounded-lg p-3 text-sm whitespace-pre-wrap',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      {message.text}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[75%] rounded-lg p-3 bg-secondary">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-0"></span>
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></span>
                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></span>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="border-t p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {messages.length <= 1 && quickReplies.map((reply) => (
                <Button key={reply} variant="outline" size="sm" onClick={() => handleQuickReply(reply)}>
                    {reply}
                </Button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="pr-12"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              disabled={isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <CircleSlash className="h-3 w-3"/> This is an AI assistant. For emergencies, please use the Emergency Support button.
          </p>
        </div>
      </div>
      <EmergencyDialog open={isCrisis} onOpenChange={setIsCrisis} />
    </>
  );
}
